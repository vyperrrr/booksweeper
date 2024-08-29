package com.cicau.book.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info (
                contact = @Contact(
                        name = "Cicau",
                        email = "gpatrik101@gmail.com"
                ),
                description = "OpenApi documentation",
                title = "OpenApi specification",
                version = "1.0",
                license = @License(
                        name = "License name",
                        url = "License url"
                ),
                termsOfService = "Terms of service"
        ),
        servers = {
                @Server(
                        description = "Local server",
                        url = "http://localhost:8088/api/v1"
                ),
                @Server(
                        description = "Production server",
                        // Fake url
                        url = "https://book-sweeper.herokuapp.com/api/v1"
                )
        },
        security = {}
)
public class OpenApiConfig {
}
