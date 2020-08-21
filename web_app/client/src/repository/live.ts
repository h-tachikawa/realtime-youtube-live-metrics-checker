import axios from "axios";

import { LiveSnippet } from "../type";

const fetchLiveSnippet = (liveId: string) => axios.get<LiveSnippet>(`${process.env.REACT_APP_API_ENDPOINT_BASE}/api/live/snippet/${liveId}`);

export const LiveRepository = {
  fetchLiveSnippet,
};