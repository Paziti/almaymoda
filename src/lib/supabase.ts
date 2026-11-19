"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/**
 * true si el sitio se armó con las claves de Supabase: los datos viven en la base.
 * false (compu sin .env.local, GitHub Pages): todo queda en el navegador, como en la etapa 1.
 */
export const REMOTE = !!(url && key);

/** Cliente de Supabase, o null si el sitio funciona sin base. */
export const supabase: SupabaseClient | null = REMOTE ? createClient(url!, key!) : null;

/** Bucket público donde se guardan las fotos de los artículos. */
export const PHOTO_BUCKET = "fotos";
