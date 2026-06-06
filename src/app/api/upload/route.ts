import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/upload
 * Proxies image uploads to Cloudinary using signed server-side credentials.
 * The client sends a FormData with a "file" field; this route signs the upload
 * server-side so neither the API key nor secret are ever exposed to the browser.
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.error("[Upload] Missing Cloudinary env vars");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Build the signed upload request
    const timestamp = Math.round(Date.now() / 1000).toString();
    const folder = "weego-activities";

    // Generate signature: sha1 of "folder=...&timestamp=..." + api_secret
    const signaturePayload = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(signaturePayload);
    const hashBuffer = await crypto.subtle.digest("SHA-1", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    // Upload to Cloudinary
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("api_key", apiKey);
    uploadData.append("timestamp", timestamp);
    uploadData.append("signature", signature);
    uploadData.append("folder", folder);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: uploadData }
    );

    const result = await res.json();

    if (!res.ok) {
      console.error("[Upload] Cloudinary error:", result);
      return NextResponse.json(
        { error: result.error?.message || "Upload failed" },
        { status: res.status }
      );
    }

    return NextResponse.json({
      secure_url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("[Upload] Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
