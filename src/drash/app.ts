import { Drash } from "https://deno.land/x/drash@v1.0.3/mod.ts";

class HomeResource extends Drash.Http.Resource {
	static paths = ["/"];
	public GET() {
		this.response.body = "Hello World";
		return this.response;
	}
}

const server = new Drash.Http.Server ({
	response_output: "text/html",
	resources: [HomeResource]
}

server.run({
	hostname: "localhost",
	port: 1447
})
