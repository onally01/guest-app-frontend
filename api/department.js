/**
 * Api calls for department
 */
import request from "@/plugins/request";
import config from "@/plugins/config";

export function allDepartment() {
  return request({
    url: config.url.apiUrl + "/api/department",
    method: "get"
  });
}

export function registerDepartment(data) {
  return request({
    url: config.url.apiUrl + "/api/department/store",
    method: "post",
    data
  });
}

export function updateDepartment(data) {
  return request({
    url: config.url.apiUrl + "/api/department/update",
    method: "put",
    data
  });
}

export function deleteDepartment(data) {
  return request({
    url: config.url.apiUrl + "/api/department/delete",
    method: "put",
    params: data
  });
}
