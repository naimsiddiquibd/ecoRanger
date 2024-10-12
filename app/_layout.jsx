import { Slot } from "expo-router";
import { useEffect } from "react";
import * as ScreenOrientation from 'expo-screen-orientation';
// Function to lock the screen orientation to landscape
const lockOrientation = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
};

export default function RootLayout() {
    useEffect(() => {
        lockOrientation();
    }, []);
    return (
        <Slot />
    )
}