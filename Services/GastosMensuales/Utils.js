// ***** LOCAL VARIABLES ******************************************************************************************************************************************

// ***** PRIVATE FUNCTIONS *****************************************************************************************************************************************

// ***** PUBLIC FUNCTIONS ****************************************************************************************************************************************
module.exports = {
  /**
   * Validates that the parameter is a valid Day
   */
	ValidateDay: function(day) {
    var validDateRegularExpression = /^[0-3]?[0-9]$/; 

    if (day === null || day === undefined) {
      return false;
    }
    else {
      return validDateRegularExpression.test(day.toString());
    }
	},
  /**
   * Returns the first element of the array having property = value
   */
  GetItemByProperty: function(itemsArray, property, value) {
      var itemFound = null;
      itemsArray.forEach(function(item, index, array) {
        for (var key in item) {
              if (item.hasOwnProperty(key) && item[key] == value) {
                  itemFound = item;
              }
          }
      });

      return itemFound;
  }
};

