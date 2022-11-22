import { Link } from "react-router-dom";

export interface CommercialCardPros {
    commHeading: string,
    commSubHeading: string,
    commImage: string,
    commLinkTo: string
}

const CommercialCard: React.FC<CommercialCardPros> = ({ commHeading, commSubHeading, commImage, commLinkTo }) => {
    return (
        <Link to={commLinkTo}>
            <div className="commercial-card">
                <div className="commercial-card__info">
                    <h3 className="commercial-card__info__title">{commHeading}</h3>
                    <h4 className="commercial-card__info__subtitle">{commSubHeading}</h4>
                    <button className="commercial-card__info__btn">הזמינו עכשיו</button>
                </div>
                <div className="commercial-card__display">
                    <figure className="commercial-card__display__figure">
                        <img className="commercial-card__display__figure__image" src={commImage} alt={commHeading} />
                    </figure>
                </div>
            </div>
        </Link>
    )
}

export default CommercialCard;