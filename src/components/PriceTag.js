import { formatPrice } from "@/lib/fotmat";

export default function PriceTag({price, className}) {
    return (
        <span className={`badge ${className}`}>{formatPrice(price)}</span>
    )
}