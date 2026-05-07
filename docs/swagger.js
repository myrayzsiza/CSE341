const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Contacts API',
    version: '1.0.0',
    description: 'API for storing and retrieving contacts stored in MongoDB.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server',
    },
  ],
};

const swaggerDocument = {
  ...swaggerDefinition,
  paths: {
    '/contacts': {
      get: {
        summary: 'Get all contacts',
        responses: {
          200: {
            description: 'List of contacts',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Contact',
                  },
                },
              },
            },
          },
          500: {
            description: 'Server error',
          },
        },
      },
      post: {
        summary: 'Create a new contact',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ContactInput',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Contact created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Contact',
                },
              },
            },
          },
          400: {
            description: 'Invalid request payload',
          },
          500: {
            description: 'Server error',
          },
        },
      },
    },
    '/contacts/{id}': {
      get: {
        summary: 'Get a contact by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Contact retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Contact',
                },
              },
            },
          },
          400: {
            description: 'Invalid contact ID format',
          },
          404: {
            description: 'Contact not found',
          },
          500: {
            description: 'Server error',
          },
        },
      },
      put: {
        summary: 'Update a contact by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ContactInput',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Contact updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Contact',
                },
              },
            },
          },
          400: {
            description: 'Invalid request',
          },
          404: {
            description: 'Contact not found',
          },
          500: {
            description: 'Server error',
          },
        },
      },
      delete: {
        summary: 'Delete a contact by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          204: {
            description: 'Contact deleted successfully',
          },
          400: {
            description: 'Invalid contact ID format',
          },
          404: {
            description: 'Contact not found',
          },
          500: {
            description: 'Server error',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Contact: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'MongoDB ObjectId',
          },
          firstName: {
            type: 'string',
            example: 'Alice',
          },
          lastName: {
            type: 'string',
            example: 'Johnson',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'alice.johnson@example.com',
          },
          favoriteColor: {
            type: 'string',
            example: 'Blue',
          },
          birthday: {
            type: 'string',
            example: '1990-02-14',
          },
        },
      },
      ContactInput: {
        type: 'object',
        required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
        properties: {
          firstName: {
            type: 'string',
            example: 'Alice',
          },
          lastName: {
            type: 'string',
            example: 'Johnson',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'alice.johnson@example.com',
          },
          favoriteColor: {
            type: 'string',
            example: 'Blue',
          },
          birthday: {
            type: 'string',
            example: '1990-02-14',
          },
        },
      },
    },
  },
};

module.exports = swaggerDocument;
