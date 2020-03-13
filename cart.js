module.exports = function(input) {
    const invetoryobj = {
        "CH1": { "price": 3.11, "name": "Chai" },
        "AP1": { "price": 6.00, "name": "Apples" },
        "CF1": { "price": 11.23, "name": "Coffee" },
        "MK1": { "price": 4.75, "name": "Milk" },
        "OM1": { "price": 3.69, "name": "Oatmeal" }
    }
    var cart = []

    function calculate(input) {
        var dashboard = []
        var apcount = 0;
        var chcount = 0;
        var cfcount = 0;
        var omcount = 0;
        var mkcount = 0;
        input.forEach(element => {
            tempobj = {}
            tempobj[element] = {}
            tempobj[element]["offer"] = []
            tempobj[element]["offerdeduction"] = []
            tempobj[element]["totalprice"] = 0
            switch (element) {
                case "AP1":
                    apcount++
                    if (apcount == 3) {


                        tempobj[element]["offer"].push("APPL")
                        tempobj[element]["offerdeduction"].push(-1.5)
                        tempobj[element]["totalprice"] = invetoryobj[element]["price"] + tempobj[element]["offerdeduction"][0]
                        cart.forEach(eachcartentry => {

                            var object = Object.keys(eachcartentry)
                            if (object == "AP1") {
                                eachcartentry[object]["offer"].push("APPL")
                                eachcartentry[object]["offerdeduction"].push(-1.5)
                                eachcartentry[object]["totalprice"] = invetoryobj[element]["price"] + eachcartentry[object]["offerdeduction"][0]
                            }

                        });


                    } else if (apcount > 3) {
                        tempobj[element]["offer"].push("APPL")
                        tempobj[element]["offerdeduction"].push(-1.5)
                        tempobj[element]["totalprice"] = invetoryobj[element]["price"] + tempobj[element]["offerdeduction"][0]
                    } else {
                        tempobj[element]["offer"] = []
                        tempobj[element]["totalprice"] = invetoryobj[element]["price"]
                    }


                    tempobj[element]["price"] = invetoryobj[element]["price"]

                    break;
                case "CF1":
                    cfcount++
                    if (cfcount % 2 == 0) {
                        tempobj[element]["offer"] = ["BOGO"]
                        tempobj[element]["offerdeduction"].push(-Math.abs(invetoryobj[element]["price"]))
                        tempobj[element]["price"] = invetoryobj[element]["price"]
                        tempobj[element]["totalprice"] = invetoryobj[element]["price"] + tempobj[element]["offerdeduction"][0]

                    } else {
                        tempobj[element]["offer"] = []
                        tempobj[element]["totalprice"] = invetoryobj[element]["price"]
                        tempobj[element]["price"] = invetoryobj[element]["price"]

                    }


                    break;
                case "CH1":
                    chcount++

                    tempobj[element]["offer"] = []
                    tempobj[element]["price"] = invetoryobj[element]["price"]
                    tempobj[element]["totalprice"] = invetoryobj[element]["price"]

                    break;
                case "OM1":
                    omcount++

                    tempobj[element]["offer"] = []
                    tempobj[element]["price"] = invetoryobj[element]["price"]
                    tempobj[element]["totalprice"] = invetoryobj[element]["price"]

                    break;
                case "MK1":
                    mkcount++
                    tempobj[element]["offer"] = []
                    tempobj[element]["price"] = invetoryobj[element]["price"]
                    tempobj[element]["totalprice"] = invetoryobj[element]["price"]

                    break;

                default:
                    break;
            }
            cart.push(tempobj)
        });
        if (mkcount > 0 && chcount > 0) {
            var limit = 1
            cart.forEach(eachcartentry => {

                var object = Object.keys(eachcartentry)
                    //console.log("found", object)
                if (object == "MK1" && limit == 1) {
                    //console.log("yes")

                    eachcartentry[object]["offer"].push("CHMK")
                    eachcartentry[object]["offerdeduction"].push(-Math.abs(invetoryobj[object]["price"]))
                    eachcartentry[object]["totalprice"] = invetoryobj[object]["price"] + parseInt(eachcartentry[object]["offerdeduction"][0])

                    limit--;
                }

            });
        }
        if (omcount > 0 && apcount > 0) {
            var limit = omcount
            cart.forEach(eachcartentry => {

                var object = Object.keys(eachcartentry)
                    //console.log("found", object)
                if (object == "AP1" && limit != 0) {
                    //console.log("yes")
                    eachcartentry[object]["offer"].push("APOM")
                    eachcartentry[object]["totalprice"] = eachcartentry[object]["totalprice"] * 0.5
                    eachcartentry[object]["offerdeduction"].push(-Math.abs(eachcartentry[object]["totalprice"]))


                    limit--;
                }

            });
        }


        var finalPrice = 0
        cart.forEach(item => {
            var object = Object.keys(item)
            finalPrice = finalPrice + item[object]["totalprice"]
        });

        var finaltotal = {}
        finaltotal["finalPrice"] = finalPrice
        cart.push(finaltotal);
        //console.log(JSON.stringify(cart))
    }

    calculate(input);

    return cart;

}