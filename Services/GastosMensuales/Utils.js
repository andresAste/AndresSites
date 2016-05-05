// ***** LOCAL VARIABLES ******************************************************************************************************************************************

// ***** PRIVATE FUNCTIONS *****************************************************************************************************************************************

// ***** PUBLIC FUNCTIONS ****************************************************************************************************************************************
module.exports = {
  /**
   * Validates that the parameter is a valid Day
   */
	ValidateDay: function(day) {
    var validDateRegularExpression = /^[0-3]?[0-9]$/; 

    if (day == null || day == undefined) {
      return false;
    }
    else {
      return validDateRegularExpression.test(day.toString());
    };
	}
}

