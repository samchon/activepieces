import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { projectService } from './project-service'
import { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox'
import { paginationHelper } from '../helper/pagination/pagination-utils'

export const projectModule: FastifyPluginAsyncTypebox = async (app) => {
    await app.register(projectController, { prefix: '/v1/projects' })
}

const projectController: FastifyPluginCallbackTypebox = (fastify, _opts, done) => {
    
    fastify.get('/', async (request) => {
        return paginationHelper.createPage([await projectService.getUserProjectOrThrow(request.principal.id)], null)
    })


    done()
}
