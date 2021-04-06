export default class House {

  constructor({ id, price, bedrooms, bathrooms, levels, year, description, imgUrl }) {
    // NOTE it is no longer our job to generate Id's
    this.id = id
    this.price = price
    this.bedrooms = bedrooms
    this.bathrooms = bathrooms
    this.levels = levels
    this.year = year
    this.description = description
    this.imgUrl = imgUrl

  }

  get Template() {
    return `
    <div class="col-md-4 mb-3">
      <div class="card shadow">
          <img class="card-img-top" src="${this.imgUrl}" alt="">
          <div class="card-body">
              <h4 class="card-title">$${this.price.toFixed(2)}</h4>
              <p class="card-title">bed:${this.bedrooms} | bath:${this.bathrooms} | levels:${this.levels} | built:${this.year}</p>
              <p class="card-text">${this.description}</p>
          </div>
          <div class="px-3 pb-3 d-flex justify-content-between">
              <button type="button" class="btn btn-danger" onclick="app.housesController.deleteCar('${this.id}')">Delete</button>
              <button type="button" class="btn btn-info" onclick="app.housesController.bid('${this.id}')">Bid</button>
          </div>
      </div>
    </div>
    `
  }
}