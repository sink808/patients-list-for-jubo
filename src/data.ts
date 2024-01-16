export interface Patient {
  Id: string;
  Name: string;
  OrderId: string;
}
export interface Order {
  Id: string;
  Message: string;
  OrderId: string;
}

const PATIENTS: Patient[] = [
  { Id: "1", Name: "小民", OrderId: "1" },
  { Id: "2", Name: "阿蓮", OrderId: "2" },
  { Id: "3", Name: "大雄", OrderId: "3" },
  { Id: "4", Name: "美美", OrderId: "4" },
  { Id: "5", Name: "阿翔", OrderId: "5" },
  { Id: "6", Name: "小雨", OrderId: "6" },
  { Id: "7", Name: "嘉琪", OrderId: "7" },
  { Id: "8", Name: "志明", OrderId: "8" },
  { Id: "9", Name: "王小明", OrderId: "9" },
  { Id: "10", Name: "莉莉", OrderId: "10" },
  { Id: "11", Name: "小華", OrderId: "11" },
  { Id: "12", Name: "亞瑟", OrderId: "12" },
  { Id: "13", Name: "佳蓉", OrderId: "13" },
  { Id: "14", Name: "阿偉", OrderId: "14" },
  { Id: "15", Name: "小美", OrderId: "15" },
  { Id: "16", Name: "小強", OrderId: "16" },
  { Id: "17", Name: "小玲", OrderId: "17" },
  { Id: "18", Name: "大牛", OrderId: "18" },
  { Id: "19", Name: "小珍", OrderId: "19" },
  { Id: "20", Name: "阿樂", OrderId: "20" },
];

const ORDERS: Order[] = [
  {
    Id: "1",
    Message: "超過120請施打8u",
    OrderId: "1",
  },
  {
    Id: "2",
    Message: "先精的中心龍時轉",
    OrderId: "1",
  },
];

export const getPatients: () => Promise<Patient[]> = () =>
  new Promise((resolve) => resolve(PATIENTS));
export const getOrders: () => Promise<Order[]> = () =>
  new Promise((resolve) => resolve(ORDERS));
