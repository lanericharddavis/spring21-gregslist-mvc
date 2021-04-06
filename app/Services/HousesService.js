import { ProxyState } from "../AppState.js";
import House from "../Models/House.js";
import { api } from "./AxiosService.js";


class HousesService {
  async getHouses() {
    let response = await api.get('houses')
    console.log(response.data)
    ProxyState.houses = response.data.map(h => new House(h))
  }

  async createHouse(newHouse) {
    // NOTE post creates data in the server, the first argument to extend the url the second is the data to send
    let response = await api.post('houses', newHouse)
    console.log(response.data)


    // the lazy way
    // this.getHouses()

    // the longhand way
    response.data.id = response.data._id
    let house = new House(response.data)
    ProxyState.houses = [...ProxyState.houses, house]
  }
  async bid(id) {
    // step 1: find the house
    let house = ProxyState.houses.find(house => house.id === id)
    // step 2: modify it
    house.price += 1000

    // step 3: send update to server
    await api.put('houses/' + id, { price: house.price })
    // await api.put('houses/' + id, house)


    // step 4: trigger the proxystate that a change was made
    ProxyState.houses = ProxyState.houses
  }
  async deleteHouse(id) {
    // restful convention for a delete route is '/collectionName/:id' (the ':' indicates a variable value does not need to be added)
    await api.delete('houses/' + id)
    ProxyState.houses = ProxyState.houses.filter(house => house.id != id)
  }

}

export const housesService = new HousesService();

