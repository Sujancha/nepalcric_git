"use client";

import LockerSoundscape from "./LockerSoundscape";

interface LockerStoryClientProps {
    dbValue?: string;
    era?: string;
}

export default function LockerStoryClient({ dbValue, era }: LockerStoryClientProps) {
    return <LockerSoundscape />;
}
