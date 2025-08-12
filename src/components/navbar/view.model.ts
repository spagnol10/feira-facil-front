import { useState } from "react";

export default function useNavbarViewModel() {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showExitDialog, setShowExitDialog] = useState(false);
    const [showUserOptions, setShowUserOptions] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    function openCloseDialogNotifications() {
        if (showUserOptions) {
            setShowUserOptions(false);
        }

        setShowNotifications(showNotifications == false ? true : false);
    }

    return {
        showExitDialog,
        showMobileMenu,
        showNotifications,
        setShowMobileMenu,
        setShowExitDialog,
        openCloseDialogNotifications
    }
}