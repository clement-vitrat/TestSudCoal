export default function AccueilStats() {
  return (
    <>
      <section className="accueil-stats double">
        <div className="container stats-accueil">
          <h3>Coalition Sud c'est</h3>

          <div className="container stats-carte">
            <div className="row">
              <div className="col col-xs-6 col-sm-6 col-md-6 col-lg-3">
                <div className="stats">
                  <h5>500</h5>
                  <p>Associations</p>
                </div>
              </div>

              <div className="col col-xs-6 col-sm-6 col-md-6 col-lg-3">
                <div className="stats">
                  <h5>200</h5>
                  <p>Ressources</p>
                </div>
              </div>

              <div className="col col-xs-6 col-sm-6 col-md-6 col-lg-3">
                <div className="stats">
                  <h5>150</h5>
                  <p>Utilisateurs</p>
                </div>
              </div>

              <div className="col col-xs-6 col-sm-6 col-md-6 col-lg-3">
                <div className="stats">
                  <h5>20</h5>
                  <p>Échanges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
