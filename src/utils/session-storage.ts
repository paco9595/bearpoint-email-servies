export enum SessionStorageEnum {
  currentProject = "currentProject"
}

export function getSessionStorage(name: SessionStorageEnum) : string | null {
  return JSON.parse(window.sessionStorage.getItem(name) || 'null');
}
export function setSessionStorage(name: SessionStorageEnum, value: any): void {
  window.sessionStorage.setItem(name, JSON.stringify(value));
}
