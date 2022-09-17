import { useState } from "react";

export const useModal = (initialValue = false) => {
    const [isOpen, setIsOpen] = useState(initialValue)

    const openedModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    return [isOpen, openedModal, closeModal]
}