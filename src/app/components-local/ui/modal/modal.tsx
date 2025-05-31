'use client'

import { useState } from "react"
import Button from "../button/button"
import { Star } from "lucide-react"

type AddReviewModalProps = {
    onClose: () => void,
    onSubmit: (data: { rating: number, review: string }) => void,
}

const ModalAddReview = (
    { onClose, onSubmit }: AddReviewModalProps

) => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleSubmit = () => {
        onSubmit({ rating, review });
        setRating(0);
        setReview("");
        onClose();
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto"></div>
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg space-y-4 z-10">
                <h2 className="text-xl font-bold">Beri ulasan</h2>
                <div className="flex items-center">
                    {
                        Array.from({ length: 5 }).map((_, idx) => {
                            const value = idx + 1;
                            return (
                                <div key={idx} >
                                    <Star fill={value <= (hover || rating) ? '#d4af37' : '#FFFFFF'} className="cursor-pointer" onClick={() => setRating(value)} onMouseEnter={() => setHover(value)} onMouseLeave={() => setHover(rating)} />
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Ulasan</label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="border px-3 py-2 rounded w-full"
                        rows={4}
                        placeholder="Tulis ulasan"
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <Button onClick={onClose} className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300">
                        Batal
                    </Button>
                    <Button onClick={handleSubmit} className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                        Kirim
                    </Button>
                </div>
            </div>
        </div >
    )
}

export default ModalAddReview;
