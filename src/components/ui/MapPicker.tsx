"use client";

import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "0.75rem",
};

const defaultCenter = {
  lat: 36.7538,
  lng: 3.0588,
};

interface MapPickerProps {
  value?: { lat: number; lng: number };
  onChange?: (position: { lat: number; lng: number }) => void;
}

export function MapPicker({ value, onChange }: MapPickerProps) {
  const hasApiKey = Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [markerPosition, setMarkerPosition] = useState(value || defaultCenter);
  const [prevValue, setPrevValue] = useState(value);
  
  if (value !== prevValue) {
    setPrevValue(value);
    if (value) setMarkerPosition(value);
  }

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        setMarkerPosition(newPos);
        if (onChange) {
          onChange(newPos);
        }
      }
    },
    [onChange]
  );

  if (!hasApiKey || loadError) {
    return (
      <div className="flex h-[300px] items-center justify-center rounded-xl bg-red-50 text-red-500 border border-red-200">
        Erreur de chargement de Google Maps. Vérifiez votre clé API.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex h-[300px] items-center justify-center rounded-xl bg-muted animate-pulse">
        Chargement de la carte...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={13}
        onClick={onMapClick}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </div>
  );
}
