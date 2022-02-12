import request from '@/utils/request';

export function GetBasic() {
  return request({ url: '/api/workflow/GetBasic', method: 'GET' });
}
export function GetWorkFlowInfo(workFlowId) {
  return request(
    {
      url: '/api/workflow/GetWorkFlowInfo',
      method: 'GET',
      params: { WorkFlowId: workFlowId },
    });
}

export function GetUserList(page, search) {
  return request({
    url: '/api/workflow/GetUserList',
    data: { page: page, text: search },
  });
}

export function GetCheckFactorList(sheetName) {
  return request({
    url: '/api/workflow/GetCheckFactorList',
    data: { SheetWindowName: sheetName },
  });
}

export function GetCheckOperationPurviewList(sheetName) {
  return request({
    url: '/api/workflow/GetCheckOperationPurviewList',
    data: { SheetWindowName: sheetName },
  });
}

export function SaveWorkFlow(data) {
  return request(
    {
      url: '/api/workflow/SaveWorkFlow',
      data,
    });
}
export function SaveWorkFlowNote(data) {
  return request(
    {
      url: '/api/workflow/SaveWorkFlowNote',
      data,
    });
}
export function RemoveWorkFlowNote(data) {
  return request(
    {
      url: '/api/workflow/RemoveWorkFlowNote',
      data,
    });
}
