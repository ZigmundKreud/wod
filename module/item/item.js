/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class WodItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    // Get the Item's data
    const itemData = this.data;
    const actorData = this.actor ? this.actor.data : {};
    const data = itemData.data;
    console.log(data);

      // Make separate methods for each Actor type (character, npc, etc.) to keep things organized.
      if (actorData.type === 'werewolf') this._prepareWerewolfData(actorData);
      else if (actorData.type === 'vampire') this._prepareVampireData(actorData);
      else if (actorData.type === 'mage') this._prepareMageData(actorData);
      else if (actorData.type === 'human') this._prepareHumanData(actorData);

  }
}
