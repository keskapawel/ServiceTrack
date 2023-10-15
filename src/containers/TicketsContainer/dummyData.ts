export interface IDummyData {
  id: number;
  customerName: string;
  ticketSubject: string;
  ticketDescription: string;
  ticketPriority: string;
  ticketStatus: string;
  ticketCreatedDate: string;
  ticketEditDate: string;
  ticketAssignedTo: string;
  ticketNotes: string;
}

export const dummyData: IDummyData[] = [
  {
    id: 1,
    customerName: 'Yuri Blowne',
    ticketSubject: 'ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla',
    ticketDescription:
      'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    ticketPriority: 'medium',
    ticketStatus: 'done',
    ticketCreatedDate: '5/23/2021',
    ticketEditDate: '12/23/2021',
    ticketAssignedTo: 'Enrico Cowdroy',
    ticketNotes:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices, non ligula pellentesque ultrices..',
  },
  {
    id: 2,
    customerName: 'Ada Wathall',
    ticketSubject: 'elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor',
    ticketDescription:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    ticketPriority: 'high',
    ticketStatus: 'new',
    ticketCreatedDate: '9/17/2021',
    ticketEditDate: '12/17/2021',
    ticketAssignedTo: 'Hasheem Mathews',
    ticketNotes:
      'Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
  },
  {
    id: 3,
    customerName: 'Lissa Dowbakin',
    ticketSubject: 'nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis',
    ticketDescription: 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    ticketPriority: 'low',
    ticketStatus: 'archived',
    ticketCreatedDate: '6/24/2021',
    ticketEditDate: '12/24/2021',
    ticketAssignedTo: 'Salem Shrieves',
    ticketNotes:
      'Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius.',
  },
  {
    id: 4,
    customerName: 'Alan Seagood',
    ticketSubject: 'volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed',
    ticketDescription:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    ticketPriority: 'medium',
    ticketStatus: 'archived',
    ticketCreatedDate: '9/24/2021',
    ticketEditDate: '12/24/2021',
    ticketAssignedTo: 'Janina Colson',
    ticketNotes: 'In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
  },
  {
    id: 5,
    customerName: 'Maxy Limbrick',
    ticketSubject: 'venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at',
    ticketDescription: 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    ticketPriority: 'low',
    ticketStatus: 'done',
    ticketCreatedDate: '6/15/2021',
    ticketEditDate: '12/15/2021',
    ticketAssignedTo: 'Darius Cubbin',
    ticketNotes:
      'Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
  },
  {
    id: 6,
    customerName: 'Pru Nares',
    ticketSubject: 'ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna',
    ticketDescription: 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    ticketPriority: 'low',
    ticketStatus: 'archived',
    ticketCreatedDate: '12/10/2021',
    ticketEditDate: '12/10/2021',
    ticketAssignedTo: 'Carlota Batterbee',
    ticketNotes: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.',
  },
  {
    id: 7,
    customerName: 'Ethelred Gritten',
    ticketSubject: 'nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus',
    ticketDescription:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    ticketPriority: 'medium',
    ticketStatus: 'close',
    ticketCreatedDate: '8/7/2021',
    ticketEditDate: '12/7/2021',
    ticketAssignedTo: 'Lane Buntin',
    ticketNotes:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
  },
  {
    id: 8,
    customerName: 'Launce Roebuck',
    ticketSubject: 'velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus',
    ticketDescription:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    ticketPriority: 'medium',
    ticketStatus: 'done',
    ticketCreatedDate: '2/14/2021',
    ticketEditDate: '12/14/2021',
    ticketAssignedTo: 'Germain Harbison',
    ticketNotes: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
  },
  {
    id: 9,
    customerName: 'Sibyl Philipson',
    ticketSubject:
      'neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante',
    ticketDescription: 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    ticketPriority: 'high',
    ticketStatus: 'done',
    ticketCreatedDate: '2/23/2021',
    ticketEditDate: '12/23/2021',
    ticketAssignedTo: 'Rory Deble',
    ticketNotes: 'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio.',
  },
  {
    id: 10,
    customerName: 'Vernor Devons',
    ticketSubject: 'ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo',
    ticketDescription:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    ticketPriority: 'high',
    ticketStatus: 'paused',
    ticketCreatedDate: '10/19/2021',
    ticketEditDate: '12/19/2021',
    ticketAssignedTo: 'Andonis Medway',
    ticketNotes:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Aliquam erat volutpat.',
  },
  {
    id: 11,
    customerName: 'Alexine Gioan',
    ticketSubject: 'venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in',
    ticketDescription:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    ticketPriority: 'high',
    ticketStatus: 'ongoing',
    ticketCreatedDate: '4/26/2021',
    ticketEditDate: '12/26/2021',
    ticketAssignedTo: 'Jemima Kilfether',
    ticketNotes: 'Morbi a ipsum.',
  },
  {
    id: 12,
    customerName: 'Robinette Losebie',
    ticketSubject: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus',
    ticketDescription: 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    ticketPriority: 'medium',
    ticketStatus: 'close',
    ticketCreatedDate: '7/9/2021',
    ticketEditDate: '12/9/2021',
    ticketAssignedTo: 'Annamarie Swansborough',
    ticketNotes:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.',
  },
  {
    id: 13,
    customerName: 'Onfre Frye',
    ticketSubject: 'bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus',
    ticketDescription:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    ticketPriority: 'low',
    ticketStatus: 'paused',
    ticketCreatedDate: '1/2/2021',
    ticketEditDate: '12/2/2021',
    ticketAssignedTo: 'Sam Roncelli',
    ticketNotes: 'Morbi non lectus.',
  },
  {
    id: 14,
    customerName: 'Bondon Briamo',
    ticketSubject: 'ut suscipit a feugiat et eros vestibulum ac est lacinia nisi',
    ticketDescription:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    ticketPriority: 'high',
    ticketStatus: 'new',
    ticketCreatedDate: '11/5/2021',
    ticketEditDate: '12/5/2021',
    ticketAssignedTo: 'Darlene Farrer',
    ticketNotes: 'Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.',
  },
  {
    id: 15,
    customerName: 'Demetre Klement',
    ticketSubject: 'sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque',
    ticketDescription:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    ticketPriority: 'medium',
    ticketStatus: 'ongoing',
    ticketCreatedDate: '11/2/2021',
    ticketEditDate: '12/2/2021',
    ticketAssignedTo: 'Davin MacIllrick',
    ticketNotes:
      'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
  },
  {
    id: 16,
    customerName: 'Sigismundo Kinnier',
    ticketSubject: 'suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet',
    ticketDescription:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    ticketPriority: 'medium',
    ticketStatus: 'done',
    ticketCreatedDate: '6/4/2021',
    ticketEditDate: '12/4/2021',
    ticketAssignedTo: 'Valentin Baelde',
    ticketNotes:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.',
  },
  {
    id: 17,
    customerName: 'Edna Petegrew',
    ticketSubject: 'venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam',
    ticketDescription:
      'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    ticketPriority: 'high',
    ticketStatus: 'reopened',
    ticketCreatedDate: '12/16/2021',
    ticketEditDate: '12/16/2021',
    ticketAssignedTo: 'Sherm Cowton',
    ticketNotes:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.',
  },
  {
    id: 18,
    customerName: 'Dominick Dymock',
    ticketSubject: 'nulla suspendisse potenti cras in purus eu magna vulputate luctus',
    ticketDescription:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    ticketPriority: 'low',
    ticketStatus: 'archived',
    ticketCreatedDate: '10/12/2021',
    ticketEditDate: '12/12/2021',
    ticketAssignedTo: 'Clevie Sterry',
    ticketNotes: 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
  },
  {
    id: 19,
    customerName: 'Guillermo Wands',
    ticketSubject: 'purus eu magna vulputate luctus cum sociis natoque penatibus et magnis',
    ticketDescription:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    ticketPriority: 'medium',
    ticketStatus: 'new',
    ticketCreatedDate: '4/18/2021',
    ticketEditDate: '12/18/2021',
    ticketAssignedTo: 'Jeannie Weblin',
    ticketNotes: 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
  },
  {
    id: 20,
    customerName: 'Sinclare Nyssens',
    ticketSubject: 'vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula',
    ticketDescription:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    ticketPriority: 'medium',
    ticketStatus: 'paused',
    ticketCreatedDate: '6/30/2021',
    ticketEditDate: '12/30/2021',
    ticketAssignedTo: 'Britni Champain',
    ticketNotes:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt.',
  },
  {
    id: 21,
    customerName: 'Loutitia Hunsworth',
    ticketSubject: 'aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales',
    ticketDescription:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    ticketPriority: 'medium',
    ticketStatus: 'archived',
    ticketCreatedDate: '2/9/2021',
    ticketEditDate: '12/9/2021',
    ticketAssignedTo: 'Lyon Latchmore',
    ticketNotes:
      'Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.',
  },
  {
    id: 22,
    customerName: 'Nettie Caddock',
    ticketSubject: 'felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi',
    ticketDescription:
      'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, amet, consectetuer adipiscing elit..',
    ticketPriority: 'low',
    ticketStatus: 'reopened',
    ticketCreatedDate: '3/26/2021',
    ticketEditDate: '12/26/2021',
    ticketAssignedTo: 'Arline Montfort',
    ticketNotes: 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.',
  },
  {
    id: 23,
    customerName: 'Keri Grece',
    ticketSubject: 'in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum',
    ticketDescription:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    ticketPriority: 'high',
    ticketStatus: 'archived',
    ticketCreatedDate: '3/14/2021',
    ticketEditDate: '12/14/2021',
    ticketAssignedTo: 'Tyler Matheson',
    ticketNotes:
      'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.',
  },
  {
    id: 24,
    customerName: 'Rafaela Jagoe',
    ticketSubject:
      'elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas',
    ticketDescription:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, amet, consectetuer adipiscing elit..',
    ticketPriority: 'low',
    ticketStatus: 'archived',
    ticketCreatedDate: '6/24/2021',
    ticketEditDate: '12/24/2021',
    ticketAssignedTo: 'Lizbeth Panas',
    ticketNotes: 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.',
  },
  {
    id: 25,
    customerName: 'Shirline Davidy',
    ticketSubject: 'non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices',
    ticketDescription:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    ticketPriority: 'low',
    ticketStatus: 'paused',
    ticketCreatedDate: '5/28/2021',
    ticketEditDate: '12/28/2021',
    ticketAssignedTo: 'Shirlee Collyns',
    ticketNotes:
      'Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante.',
  },
  {
    id: 26,
    customerName: 'Jayson Vido',
    ticketSubject: 'bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis',
    ticketDescription:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    ticketPriority: 'medium',
    ticketStatus: 'reopened',
    ticketCreatedDate: '2/25/2021',
    ticketEditDate: '12/25/2021',
    ticketAssignedTo: 'Ibrahim Laverick',
    ticketNotes:
      'Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.',
  },
  {
    id: 27,
    customerName: 'Eldon Camilli',
    ticketSubject: 'accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec',
    ticketDescription:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    ticketPriority: 'medium',
    ticketStatus: 'new',
    ticketCreatedDate: '7/10/2021',
    ticketEditDate: '12/10/2021',
    ticketAssignedTo: 'Electra Upchurch',
    ticketNotes:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
  },
  {
    id: 28,
    customerName: 'Alfie Alvarez',
    ticketSubject: 'eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus',
    ticketDescription:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    ticketPriority: 'medium',
    ticketStatus: 'paused',
    ticketCreatedDate: '12/1/2021',
    ticketEditDate: '12/1/2021',
    ticketAssignedTo: 'Doralin Heed',
    ticketNotes:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
  },
  {
    id: 29,
    customerName: 'Shurwood Reynish',
    ticketSubject: 'lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non',
    ticketDescription:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    ticketPriority: 'low',
    ticketStatus: 'close',
    ticketCreatedDate: '12/28/2021',
    ticketEditDate: '12/28/2021',
    ticketAssignedTo: 'Bren Simonato',
    ticketNotes:
      'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum.',
  },
  {
    id: 30,
    customerName: 'Iolande Hanretty',
    ticketSubject: 'nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at',
    ticketDescription:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    ticketPriority: 'low',
    ticketStatus: 'close',
    ticketCreatedDate: '3/20/2021',
    ticketEditDate: '12/20/2021',
    ticketAssignedTo: 'Ford Crielly',
    ticketNotes:
      'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam.',
  },
  {
    id: 31,
    customerName: 'Ellerey Wace',
    ticketSubject: 'ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat',
    ticketDescription:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    ticketPriority: 'high',
    ticketStatus: 'new',
    ticketCreatedDate: '9/14/2021',
    ticketEditDate: '12/14/2021',
    ticketAssignedTo: 'Lalo Bacup',
    ticketNotes:
      'Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
  },
  {
    id: 32,
    customerName: 'Ara Lippett',
    ticketSubject:
      'mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus',
    ticketDescription:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    ticketPriority: 'low',
    ticketStatus: 'archived',
    ticketCreatedDate: '6/25/2021',
    ticketEditDate: '12/25/2021',
    ticketAssignedTo: 'Bert Lyenyng',
    ticketNotes:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
  },
  {
    id: 33,
    customerName: 'Bron Merigon',
    ticketSubject: 'porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci',
    ticketDescription:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    ticketPriority: 'low',
    ticketStatus: 'archived',
    ticketCreatedDate: '7/29/2021',
    ticketEditDate: '12/29/2021',
    ticketAssignedTo: 'Carmen Bisset',
    ticketNotes:
      'Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.',
  },
  {
    id: 34,
    customerName: 'Freddy Nethercott',
    ticketSubject: 'odio in hac habitasse platea dictumst maecenas ut massa quis augue',
    ticketDescription:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    ticketPriority: 'medium',
    ticketStatus: 'archived',
    ticketCreatedDate: '3/8/2021',
    ticketEditDate: '12/8/2021',
    ticketAssignedTo: 'Fawn Nannizzi',
    ticketNotes:
      'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.',
  },
  {
    id: 35,
    customerName: 'Arvin Veitch',
    ticketSubject: 'nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum',
    ticketDescription:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    ticketPriority: 'medium',
    ticketStatus: 'done',
    ticketCreatedDate: '3/10/2021',
    ticketEditDate: '12/10/2021',
    ticketAssignedTo: 'Leonard Kemmis',
    ticketNotes:
      'Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum.',
  },
  {
    id: 36,
    customerName: 'Michal Durtnal',
    ticketSubject: 'in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus',
    ticketDescription:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    ticketPriority: 'high',
    ticketStatus: 'archived',
    ticketCreatedDate: '8/20/2021',
    ticketEditDate: '12/20/2021',
    ticketAssignedTo: 'Riordan Fetherstonhaugh',
    ticketNotes:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus.',
  },
  {
    id: 37,
    customerName: 'Tera Libermore',
    ticketSubject: 'et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus',
    ticketDescription: 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    ticketPriority: 'medium',
    ticketStatus: 'close',
    ticketCreatedDate: '8/9/2021',
    ticketEditDate: '12/9/2021',
    ticketAssignedTo: 'Devina Barnicott',
    ticketNotes:
      'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.',
  },
  {
    id: 38,
    customerName: 'Wenda Blayney',
    ticketSubject: 'elit ac nulla sed vel enim sit amet nunc viverra dapibus',
    ticketDescription:
      'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    ticketPriority: 'high',
    ticketStatus: 'reopened',
    ticketCreatedDate: '1/16/2021',
    ticketEditDate: '12/16/2021',
    ticketAssignedTo: 'Teddie Gawkes',
    ticketNotes:
      'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.',
  },
  {
    id: 39,
    customerName: 'Zechariah Viggers',
    ticketSubject: 'hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci',
    ticketDescription:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    ticketPriority: 'low',
    ticketStatus: 'close',
    ticketCreatedDate: '1/18/2021',
    ticketEditDate: '12/18/2021',
    ticketAssignedTo: 'Tedi Slemmonds',
    ticketNotes: 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy.',
  },
  {
    id: 40,
    customerName: 'Mason Scotchmer',
    ticketSubject: 'dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque',
    ticketDescription:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    ticketPriority: 'low',
    ticketStatus: 'paused',
    ticketCreatedDate: '7/7/2021',
    ticketEditDate: '12/7/2021',
    ticketAssignedTo: 'Janaye Newcombe',
    ticketNotes:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.',
  },
  {
    id: 41,
    customerName: 'Hermine Braiden',
    ticketSubject: 'nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend',
    ticketDescription:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    ticketPriority: 'medium',
    ticketStatus: 'new',
    ticketCreatedDate: '10/19/2021',
    ticketEditDate: '12/19/2021',
    ticketAssignedTo: 'Kimmi Paur',
    ticketNotes:
      'Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl.',
  },
  {
    id: 42,
    customerName: 'Ashley Meadows',
    ticketSubject:
      'molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae',
    ticketDescription:
      'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    ticketPriority: 'low',
    ticketStatus: 'new',
    ticketCreatedDate: '3/8/2021',
    ticketEditDate: '12/8/2021',
    ticketAssignedTo: 'Pascale Kuhwald',
    ticketNotes:
      'Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
  },
  {
    id: 43,
    customerName: 'Quincy Cawthera',
    ticketSubject: 'tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam',
    ticketDescription:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    ticketPriority: 'high',
    ticketStatus: 'done',
    ticketCreatedDate: '7/7/2021',
    ticketEditDate: '12/7/2021',
    ticketAssignedTo: 'Rochella Branni',
    ticketNotes:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.',
  },
  {
    id: 44,
    customerName: 'Johnnie MacMenamie',
    ticketSubject: 'accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio',
    ticketDescription:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    ticketPriority: 'medium',
    ticketStatus: 'archived',
    ticketCreatedDate: '12/23/2021',
    ticketEditDate: '12/23/2021',
    ticketAssignedTo: 'Aura Schimann',
    ticketNotes: 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
  },
  {
    id: 45,
    customerName: 'Guilbert Evequot',
    ticketSubject: 'orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel',
    ticketDescription:
      'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    ticketPriority: 'high',
    ticketStatus: 'close',
    ticketCreatedDate: '4/5/2021',
    ticketEditDate: '12/5/2021',
    ticketAssignedTo: 'Terrence Donovan',
    ticketNotes: 'In congue. Etiam justo. Etiam pretium iaculis justo.',
  },
  {
    id: 46,
    customerName: 'Nolan Chatelot',
    ticketSubject: 'volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in',
    ticketDescription:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    ticketPriority: 'medium',
    ticketStatus: 'paused',
    ticketCreatedDate: '3/24/2021',
    ticketEditDate: '12/24/2021',
    ticketAssignedTo: 'Kurtis Wyles',
    ticketNotes:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
  },
  {
    id: 47,
    customerName: 'Jud Bonniface',
    ticketSubject: 'aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque',
    ticketDescription:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    ticketPriority: 'low',
    ticketStatus: 'paused',
    ticketCreatedDate: '1/5/2021',
    ticketEditDate: '12/5/2021',
    ticketAssignedTo: 'Charo Hartburn',
    ticketNotes: 'In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt.',
  },
  {
    id: 48,
    customerName: 'Donnie Lackner',
    ticketSubject: 'blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede',
    ticketDescription:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    ticketPriority: 'high',
    ticketStatus: 'archived',
    ticketCreatedDate: '9/16/2021',
    ticketEditDate: '12/16/2021',
    ticketAssignedTo: 'Manfred Mossop',
    ticketNotes:
      'Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis.',
  },
  {
    id: 49,
    customerName: 'Dulcie Jeffcoat',
    ticketSubject: 'fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit',
    ticketDescription:
      'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    ticketPriority: 'low',
    ticketStatus: 'archived',
    ticketCreatedDate: '12/29/2021',
    ticketEditDate: '12/29/2021',
    ticketAssignedTo: 'Lani Emons',
    ticketNotes:
      'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.',
  },
  {
    id: 50,
    customerName: 'Danni Dallewater',
    ticketSubject: 'vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum',
    ticketDescription:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    ticketPriority: 'medium',
    ticketStatus: 'paused',
    ticketCreatedDate: '9/28/2021',
    ticketEditDate: '12/28/2021',
    ticketAssignedTo: 'Sharona Lazenby',
    ticketNotes:
      'Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis.',
  },
];
