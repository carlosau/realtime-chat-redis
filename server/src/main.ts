import fastifyCors from '@fastify/cors';
import dotenv from 'dotenv';
import fastify from 'fastify';
import fastifyIO from 'fastify-socket.io';

dotenv.config();

const PORT = parseInt(process.env.PORT || '3001', 10);
const HOST = process.env.HOST || '0.0.0.0';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL 

if (!UPSTASH_REDIS_REST_URL) {
    console.error('Missing env variable: UPSTASH_REDIS_REST_URL');
    process.exit(1);
}

async function buildServer(){
    const app = fastify()

    await app.register(fastifyCors, {
        origin: CORS_ORIGIN,
    })

    await app.register(fastifyIO)

    app.io.on('connection', (io) => {
        console.log('client connected')
        io.on('disconnect', () => {
            console.log("client disconnected")
        })
    })

    app.get('/healthcheck', () => {
        return { 
            status: 'ok' ,
            port: PORT,
        }
    })

    return app
}

async function main(){
    const app = await buildServer()

    try{
        await app.listen({
            port: PORT,
            host: HOST
        })
        console.log(`Server is running on ${HOST}:${PORT}`)

    } catch (e) {
        console.error(e)
        process.exit(1)
    }
    
}

main()