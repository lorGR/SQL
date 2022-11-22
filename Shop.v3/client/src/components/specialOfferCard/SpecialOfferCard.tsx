import { Link } from "react-router-dom"

export interface SpecialOfferCardProps {
    offerHeading: string,
    offerText: string,
    offerLinkTo: string,
    offerImage: string,
    offerImageAlt: string
}

const SpecialOfferCard: React.FC<SpecialOfferCardProps> = ({ offerHeading, offerText, offerLinkTo, offerImage, offerImageAlt }) => {
    return (
        <Link to={offerLinkTo}>
            <div className="special-offer-card">
                <div className="special-offer-card__image">
                    <figure>
                        <img src={offerImage} alt={offerImageAlt} />
                    </figure>
                </div>
                <div className="special-offer-card__context">
                    <h2>{offerHeading}</h2>
                    <p>{offerText}</p>
                    <p>למידע נוסף</p>
                </div>
            </div>
        </Link>
    )
}

export default SpecialOfferCard;

