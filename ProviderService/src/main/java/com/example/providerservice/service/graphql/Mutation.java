package com.example.providerservice.service.graphql;

import com.example.providerservice.model.Post;
import graphql.kickstart.tools.GraphQLMutationResolver;
import java.security.SecureRandom;
import org.springframework.stereotype.Component;

@Component
public class Mutation implements GraphQLMutationResolver {

  public Post createPost(String text) {
    Post post = new Post(new SecureRandom().nextLong());
    post.setText(text);
    return post;
  }
}
