"use client";

import { FoldProvider } from "@fold-dev/core";
import "@fold-dev/core/dist/styles.css";
import { useEffect, useState } from "react";
import SelectExample from "./select-example";

export default function Home() {
    const [ready, setReady] = useState(false);
    useEffect(() => setReady(true), []);
    if (!ready) return null;
    return (
        <FoldProvider>
            <SelectExample />
        </FoldProvider>
    );
}
