export interface IAction {
	type: string;
	payload?: any;
}

export interface IState {
	isLoading: boolean;
	hits: any[];
	query: string;
	page: number;
	nbPages: number;
}
