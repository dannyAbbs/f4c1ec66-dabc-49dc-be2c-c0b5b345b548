
//below are all APIs used in the project.
const postCodeAPI = () => `${omsAPI}Code/PostCode`;
const searchCodesByTypeAPI = (filter, type) => `${omsAPI}Code/GetAllCodes/${filter}/${type}`;
const putCodesAPI = () => `${omsAPI}Code/PutCode`;
const deleteCodesAPI = (itemId) => `${omsAPI}Code/DeleteCode/${itemId}`;

const searchDistrictAPI = (filter) => `${omsAPI}District/GetAllDistricts/${filter}`;
const searchDistrictByRegionAPI = (regionId) => `${omsAPI}District/GetDistrictByRegionId/${regionId}`;
const postDisrictAPI = () => `${omsAPI}District/PostDistrict`;
const putDisrictAPI = () => `${omsAPI}District/PutDistrict`;
const deleteDisrictAPI = (itemId) => `${omsAPI}District/DeleteDistrict/${itemId}`;

const searchTownAPI = (filter) => `${omsAPI}Town/GetAllTowns/${filter}`;
const postTownAPI = () => `${omsAPI}Town/PostTown`;
const putTownAPI = () => `${omsAPI}Town/PutTown`;
const deleteTownAPI = (itemId) => `${omsAPI}Town/DeleteTown/${itemId}`;

const postOutletAPI = () => `${omsAPI}RetailOutlet/PostRetailOutlet`;
const putOutletAPI = () => `${omsAPI}RetailOutlet/PutRetailOutlet`;
const searchOutletAPI = (filter) => `${omsAPI}RetailOutlet/GetAllRetailOutlets/${filter}`;
const deleteOutletAPI = (itemId) => `${omsAPI}RetailOutlet/DeleteRetailOutlet/${itemId}`;

const postPumpAPI = () => `${omsAPI}Pump/PostPump`;
const searchPumpAPI = (filter) => `${omsAPI}Pump/GetAllPumps/${filter}`;
const putPumpAPI = () => `${omsAPI}Pump/PutPump`;
const deletePumpAPI = (itemId) => `${omsAPI}Pump/DeletePump/${itemId}`;

const postProductAPI = () => `${omsAPI}Product/PostProduct`;
const putProductAPI = () => `${omsAPI}Product/PutProduct`;
const deleteProductAPI = (itemId) => `${omsAPI}Product/DeleteProduct/${itemId}`;
const searchProductAPI = (filter) => `${omsAPI}Product/GetAllProductes/${filter}`;

const postCustomerAPI = () => `${omsAPI}Customer/PostCustomer`;
const putCustomerAPI = () => `${omsAPI}Customer/PutCustomer`;
const deleteCustomerAPI = (itemId) => `${omsAPI}Customer/DeleteCustomer/${itemId}`;
const searchCustomerAPI = (filter) => `${omsAPI}Customer/GetAllCustomers/${filter}`;

const postUserAPI = () => `${omsAPI}Users/PostUserRegistration`;
const putUserAPI = () => `${omsAPI}Users/PutUserRegistration`;
const searchUserAPI = (filter) => `${omsAPI}Users/GetAllUserRecords/${filter}`;
const deleteUserAPI = (itemId) => `${omsAPI}User/DeleteUsersById/${itemId}`;
const getUserAccessAPI = (userId) => `${omsAPI}Users/GetAllAccessUsersRecordsByUserId/${userId}`;
const getUserSegmentsAPI = (userId) => `${omsAPI}Users/GetAllUserSegmentRecordsByUserId/${userId}`;

const getMenusByAppIdAPI = (appId) => `${omsAPI}Menus/GetAllMenusByAppId/${appId}`;

