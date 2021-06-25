package com.example.providerservice.service.graphql;

import com.example.providerservice.model.Post;
import graphql.kickstart.tools.GraphQLQueryResolver;
import java.util.concurrent.CompletableFuture;
import org.springframework.stereotype.Component;

@Component
class Query implements GraphQLQueryResolver {

  CompletableFuture<Post> getPost(Long id) {
    return CompletableFuture.supplyAsync(() -> new Post(id));
  }
}
