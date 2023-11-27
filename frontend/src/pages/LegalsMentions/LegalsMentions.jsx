/* eslint-disable camelcase */
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { sanitize } from "isomorphic-dompurify";
import AuthContext from "../../contexts/AuthContext";
import CompanyContext from "../../contexts/CompanyContext";
import PageHeader from "../../components/PageHeader/PageHeader";
import NavBar from "../../components/NavBar/NavBar";
import Connection from "../../components/Connection/Connection";
import "./LegalsMentions.scss";

export default function LegalsMentions() {
  const { userToken, userInfos } = useContext(AuthContext);
  const { setCompanyInfos, companyInfos } = useContext(CompanyContext);
  const { company_slug } = useParams();

  useEffect(() => {
    setCompanyInfos((prevCompanyInfos) => ({
      ...prevCompanyInfos,
      slug: sanitize(company_slug),
    }));
  }, [company_slug, setCompanyInfos]);

  let userCompaniesArray = [];
  if (userToken && Object.keys(userInfos).length) {
    if (userInfos.companies) {
      userCompaniesArray = userInfos.companies.split(",");
    }
  }

  return (
    <div>
      {userToken &&
      Object.keys(userInfos).length &&
      (userCompaniesArray.includes(companyInfos.id.toString()) ||
        userInfos.is_salesforce_admin) ? (
        <main>
          <NavBar activeLink="Mentions légales" />
          <PageHeader
            title="Mentions légales"
            subtitle="Voici les mentions légales que vous devez respecter"
          />
          <div className="page-actions">
            <div>
              <h1> MENTIONS LEGALES </h1>
              <p>
                Correspondant aux obligations de l'article 6-III et 19 de la Loi
                numéro 2004-575 du 21 juin 2004 concernant la Confiance dans
                l'économie numérique, dite L.C.E.N., nous informons les
                visiteurs du site web : CookBuddy Les informations qui suivent :
              </p>

              <p>
                1. Déclaration légales : Titulaire : L'équipe de CookBuddy
                Adresse de localisation du propriétaire : a 31100 - TOULOUSE Le
                Fabricant du site web est : L'équipe de CookBuddy Chef de
                publication : L'équipe de CookBuddy Ou contacter le Décideur de
                la publication : contact@cookbuddy.fr Le Concepteur est :
                L'équipe de CookBuddy De quelle façon contacter le Webmaster :
                contact@cookbuddy.fr Hébergeur : OVH SAS au capital social de 10
                174 560 Euros Immatriculation RCS Lille Métropole 424 761 419
                00045 Code APE (INSEE) 2620Z Numéro de TVA : FR 22 424 761 419
                Siège social : 2 rue Kellermann - 59100 Roubaix - France Les
                Mentions Légales ont été générées via cet outil
              </p>

              <p>
                2. Présentation et principe : Tout internaute qui utilise le
                site internet : localhost:3000 est considéré comme usager du
                site internet. Le site internet localhost:3000 regroupe
                différents services, en l'état, disponible pour les usagers. Il
                est naturellement précisé que ces derniers doivent rester
                courtois et faire preuve de bonne foi tant envers les autres
                utilisateurs qu'envers le Développeur du site localhost:3000. Le
                site localhost:3000 est mis à jour de façon régulière par
                L'équipe de CookBuddy. L'équipe de CookBuddy s'efforce
                d'indiquer sur le site localhost:3000 des informations les plus
                véridiques possibles (sous réserve de modifications), mais ne
                peuvent garantir l'exactitude, la complétude et l'actualité des
                informations répandues sur son site web, qu'elles soient de son
                fait ou du fait des tiers partenaires qui lui fournissent ces
                informations. En répercussion, l'utilisateur reconnaît utiliser
                ces informations données sous sa responsabilité exclusive.
              </p>

              {/* Ajoutez ici le reste des mentions légales selon votre besoin */}
            </div>
          </div>
        </main>
      ) : (
        <Connection />
      )}
    </div>
  );
}
