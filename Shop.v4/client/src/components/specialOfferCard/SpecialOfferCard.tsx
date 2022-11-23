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
                <div className="special-offer-card__display">
                    <figure className="special-offer-card__display__figure">
                        <img className="special-offer-card__display__figure__image" src={offerImage} alt={offerImageAlt} />
                    </figure>
                </div>
                <div className="special-offer-card__context">
                    <p className="special-offer-card__context__title">{offerHeading}</p>
                    <p className="special-offer-card__context__subtext">{offerText}</p>
                    <div className="special-offer-card__context__btn-container">
                        <button className="special-offer-card__context__btn-container__btn">למידע נוסף</button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SpecialOfferCard;

