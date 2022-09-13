import { DadJokes } from "./../interfaces/index";
export const API_URL = "https://icanhazdadjoke.com/search";
export const OPTIONS = {
  method: "GET",
  headers: { Accept: "application/json" },
};
export const INIT: DadJokes = {
  current_page: 0,
  limit: 0,
  next_page: 0,
  previous_page: 0,
  results: [],
  search_term: "",
  total_jokes: 0,
  total_pages: 0,
};
export const DEFAULT_JOKES = 20;
