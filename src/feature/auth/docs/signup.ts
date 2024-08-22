export default {
  post: {
    tags: ['auth'],
    summary: 'Create an user',
    description: 'Create an user',
    operationId: 'userOnboard',
    security: [],
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/authenticationSchema/properties/signupUserDetailRequest'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'User Creation',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  example: '0'
                },
                message: {
                  type: 'string',
                  example: 'SUCCESS'
                },
                data: {
                  type: 'object',
                  $ref: '#/components/schemas/authenticationSchema/properties/signupUserDetailsResponse'
                }
              }
            }
          }
        }
      },
      400: {
        description: 'Bad Request',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  description: 'code',
                  example: '-1'
                },
                message: {
                  type: 'string',
                  description: 'message',
                  example: 'Bad Request'
                },
                data: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description: 'message',
                      example: 'Invalid....'
                    }
                  }
                }
              }
            }
          }
        }
      },
      404: {
        description: 'API not found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  description: 'code',
                  example: '-1'
                },
                message: {
                  type: 'string',
                  description: 'message',
                  example: 'Not Found'
                },
                data: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description: 'message',
                      example: 'Cannot find appropriate API'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
