export default {
  post: {
    tags: ['auth'],
    summary: 'Authenticate a customer and receive a JWT token',
    description: 'Authenticate a customer and receive a JWT token',
    operationId: 'userLogin',
    security: [
      // {
      //   'X-XSRF-TOKEN': []
      // }
    ],
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['loginId', 'password'],
            properties: {
              email: {
                type: 'string',
                description: 'loginId',
                example: 'amankhadka101@gmail.com'
              },
              password: {
                type: 'string',
                description: 'password',
                example: 'Test@123'
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'OK',
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
                  $ref: '#/components/schemas/authenticationSchema/properties/loginUserDetailRepsonse'
                }
              }
            }
          }
        }
      },
      400: {
        description: 'Invalid username/password',
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
                      example: 'Invalid username/password'
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
