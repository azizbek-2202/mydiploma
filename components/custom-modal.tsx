"use client"

import { ReactNode } from "react"

interface CustomModalProps {
    open: boolean
    onClose: () => void
    children: ReactNode
    title?: string
}

export default function CustomModal({ open, onClose, children, title }: CustomModalProps) {
    if (!open) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                    ✕
                </button>

                {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

                {children}
            </div>
        </div>
    )
}
