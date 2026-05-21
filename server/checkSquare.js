import "dotenv/config";
import squareClient from "./utils/squareClient.js";

const showMethods = (name, obj) => {
    console.log(`\n${name}:`);
    if (!obj) {
        console.log("NOT FOUND");
        return;
    }

    console.log(
        Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter(
            (key) => key !== "constructor"
        )
    );
};


showMethods("locations", squareClient.locations);
showMethods("teamMembers", squareClient.teamMembers);
showMethods("catalog", squareClient.catalog);