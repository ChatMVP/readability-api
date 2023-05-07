import { Readability } from '@mozilla/readability';
import { serve } from '@hono/node-server'
import { Context, Hono } from 'hono'
import { JSDOM } from 'jsdom'


const app = new Hono()

app.post('/v1/parse', async (ctx: Context) => {
	const body = await ctx.req.arrayBuffer()

	const dom = new JSDOM(body)

	const article = new Readability(dom.window.document).parse()

	if (article === null) {
		return new Response(JSON.stringify({
			success: false,
			message: 'Invalid HTML document'
		}), {
			status: 400
		})
	}

	return new Response(JSON.stringify({
		success: true,
		result: article
	}), {
		headers: {
			'Content-Type': 'application/json'
		}
	})
})

serve({fetch: app.fetch, port: 8080}, (info) => {
	console.log(`Listening on ${info.address}:${info.port}`)
})
