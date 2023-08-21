import {ContentClient} from "dc-delivery-sdk-js";
class Client {

  constructor() {
    this.client = new ContentClient({
      hubName: 'epammarketplacetest',
    });
  }

  async getByKey(key) {
    return this.client.getContentItemByKey(key);
  }

  async getById(id) {
    return this.client.getContentItemById(id);
  }
}

export default Client;