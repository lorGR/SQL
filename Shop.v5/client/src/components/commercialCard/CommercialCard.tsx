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
                    <div className="commercial-card__info__information">
                        <p className="commercial-card__info__information__title">{commHeading}</p>
                        <p className="commercial-card__info__information__subtitle">{commSubHeading}</p>
                    </div>
                    <div className="commercial-card__info__btn-container">
                        <button className="commercial-card__info__btn-container__btn">הזמינו עכשיו</button>
                    </div>
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