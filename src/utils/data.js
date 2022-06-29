export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}'] `;

    return query;
}

export const searchQuery = (searchTerm) => {
    const query = `*[_type == "pin" && tittle match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image {
            asset -> {
                url
            }
        },
        _id,
        information,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[] {
            _key,
            postedBy -> {
                _id,
                userName,
                image
            },
        },
        like[] {
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        },
    }`

    return query;
}

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      information,
      _createdAt,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
      like[] {
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
      
    } `;

    export const pinDetailQuery = (pinId) => {
      const query = `*[_type == "pin" && _id == '${pinId}']{
        image{
          asset->{
            url
          }
        },
        _id,
        title, 
        about,
        category,
        information,
        postedBy->{
          _id,
          userName,
          image
        },
       save[]{
          postedBy->{
            _id,
            userName,
            image
          },
        },
        comments[]{
          comment,
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        }
      }`;
      return query;
    };
    
    export const pinDetailMorePinQuery = (pin) => {
      const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
        image{
          asset->{
            url
          }
        },
        _id,
        information,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        },
      }`;
      return query;
    };

    export const userCreatedPinsQuery = (userId) => {
      const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
        image{
          asset->{
            url
          }
        },
            _id,
            _createdAt,
            postedBy->{
              _id,
              userName,
              image
            },
            save[]{
              _key,
              postedBy->{
                _id,
                userName,
                image
              },
            },
      }`;
      return query;
    };
    
    export const userSavedPinsQuery = (userId) => {
      const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
        image{
          asset->{
            url
          }
        },
        _id,
        destination,
        _createdAt,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          postedBy->{
            _id,
            userName,
            image
          },
        },
      }`;
      return query;
    };