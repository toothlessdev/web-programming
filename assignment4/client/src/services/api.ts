export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = {
    Get: async <ResponseBody>(url: string) => {
        const response = await fetch(API_BASE_URL + url, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error("Get Request Failed");
        const data = await response.json();
        return data as ResponseBody;
    },
    Post: async <RequestBody, ResponseBody>(url: string, body: RequestBody) => {
        const response = await fetch(API_BASE_URL + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error("Post Request Failed");
        const data = await response.json();
        return data as ResponseBody;
    },
    Patch: async <RequestBody, ResponseBody>(url: string, body: RequestBody) => {
        const response = await fetch(API_BASE_URL + url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error("PATCH Request Failed");
        const data = await response.json();
        return data as ResponseBody;
    },
    Delete: async (url: string) => {
        const response = await fetch(API_BASE_URL + url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error("Delete Request Failed");
        const data = await response.json();
        return data;
    },
};
