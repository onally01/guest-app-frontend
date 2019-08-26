/**
 * Api calls for staff
 */
import request from "@/plugins/request";
import config from "@/plugins/config";

export function allStaff() {
  return request({
    url: config.url.apiUrl + "/api/staff",
    method: "get"
  });
}

export function registerStaff(data) {
  return request({
    url: config.url.apiUrl + "/api/staff/store",
    method: "post",
    data
  });
}

export function updateStaff(data) {
  return request({
    url: config.url.apiUrl + "/api/staff/update",
    method: "put",
    data
  });
}

export function deleteStaff(data) {
  return request({
    url: config.url.apiUrl + "/api/staff/delete",
    method: "put",
    params: data
  });
}
