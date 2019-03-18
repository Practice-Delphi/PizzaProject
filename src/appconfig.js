export const apiurl = 'http://localhost:5002';

export const googleApiKey = 'AIzaSyC87Z1ajBRY2k57mV--zFuqfubn4HynjpQ';

// export const allroles = [
//     "owner",
//     "driver",
//     "customer",
// ]

export const cutroles = new Map([
    ["unconfirmedOwner", "Owner"],
    ["unconfirmedCustomer", "Customer"],
    ["unconfirmedDriver", "Driver"],
]);

export const fullroles = new Map([
    ["customer", "Customer"],
    ["owner", "Owner"],
    ["driver", "Driver"],
    ["admin", "Admin"],
]);

export const allroles = new Map([
    ...fullroles,
    ...cutroles
]);

export const signingoogleurl = `${apiurl}/Login/Google`;
export const signinfacebookurl = `${apiurl}/Login/Facebook`; 
export const redirecturl = 'http://localhost:3000/sign-in';