import axios from 'axios';

async function issueVerifiableCredential() {
  try {
    const response = await axios.post('https://issuer.portal.walt.id/raw/jwt/sign', {
      issuanceKey: {
        type: 'local',
        jwk: {
          kty: 'OKP',
          d: 'mDhpwaH6JYSrD2Bq7Cs-pzmsjlLj4EOhxyI-9DM1mFI',
          crv: 'Ed25519',
          kid: 'Vzx7l5fh56F3Pf9aR3DECU5BwfrY6ZJe05aiWYWzan8',
          x: 'T3T4-u1Xz3vAV2JwPNxWfs4pik_JLiArz_WTCvrCFUM',
        },
      },
      issuerDid: 'did:key:z6MkjoRhq1jSNJdLiruSXrFFxagqrztZaXHqHGUTKJbcNywp',
      vc: {
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          'https://purl.imsglobal.org/spec/ob/v3p0/context.json',
        ],
        id: 'urn:uuid:THIS WILL BE REPLACED WITH DYNAMIC DATA FUNCTION (see below)',
        type: ['VerifiableCredential', 'OpenBadgeCredential'],
        name: 'JFF x vc-edu PlugFest 3 Interoperability',
        issuer: {
          type: ['Profile'],
          id: 'did:key:THIS WILL BE REPLACED WITH DYNAMIC DATA FUNCTION FROM CONTEXT (see below)',
          name: 'Jobs for the Future (JFF)',
          url: 'https://www.jff.org/',
          image: 'https://w3c-ccg.github.io/vc-ed/plugfest-1-2022/images/JFF_LogoLockup.png',
        },
        issuanceDate: '2023-07-20T07:05:44Z (THIS WILL BE REPLACED BY DYNAMIC DATA FUNCTION (see below))',
        expirationDate: 'WILL BE MAPPED BY DYNAMIC DATA FUNCTION (see below)',
        credentialSubject: {
          id: 'did:key:123 (THIS WILL BE REPLACED BY DYNAMIC DATA FUNCTION (see below))',
          type: ['AchievementSubject'],
          achievement: {
            id: 'urn:uuid:ac254bd5-8fad-4bb1-9d29-efd938536926',
            type: ['Achievement'],
            name: 'JFF x vc-edu PlugFest 3 Interoperability',
            description: 'This wallet supports the use of W3C Verifiable Credentials and has demonstrated interoperability during the presentation request workflow during JFF x VC-EDU PlugFest 3.',
            criteria: {
              type: 'Criteria',
              narrative: 'Wallet solutions providers earned this badge by demonstrating interoperability during the presentation request workflow. This includes successfully receiving a presentation request, allowing the holder to select at least two types of verifiable credentials to create a verifiable presentation, returning the presentation to the requestor, and passing verification of the presentation and the included credentials.',
            },
            image: {
              id: 'https://w3c-ccg.github.io/vc-ed/plugfest-3-2023/images/JFF-VC-EDU-PLUGFEST3-badge-image.png',
              type: 'Image',
            },
          },
        },
      },
      mapping: {
        id: '<uuid>',
        issuer: {
          id: '<issuerDid>',
        },
        credentialSubject: {
          id: '<subjectDid>',
        },
        issuanceDate: '<timestamp>',
        expirationDate: '<timestamp-in:365d>',
      },
    },
    {
      headers: {
        accept: 'application/json',
        'walt-key': JSON.stringify({
          type: 'local',
          jwk: '{"kty":"OKP","d":"c0Kp30JlWHo7TTrUlIa5VAITSz7kHyjgcf8GhrE62HM","crv":"Ed25519","kid":"fY65A6wctTWJ8dx0nQMZRSOq9jeTqcvkhBf031-m5xw","x":"jztE8zvLq5jK32Bq3u7BoPh0-F5ZgCzY-yY6-4fyb4k"}',
        }),
        'walt-issuerDid': 'did:key:z6Mkp6NmHZeksMF5T6uKpLvVqgJQjYjnAZggdKQv2PmfD2ja',
        'walt-subjectDid': 'did:jwk:eyJrdHkiOiJPS1AiLCJjcnYiOiJFZDI1NTE5Iiwia2lkIjoieGk2RnNJRl9uYVlrN2dFcS0ycHRGQlZEaURUanl5MVpMVUdSWkx3eHE3USIsIngiOiJnQ0NpMHdMem9yRW1QTFNLWVg0bVhsUlRoOVdlQzF6YWYwd1pJRXQySG5JIn0',
        'Content-Type': 'application/json',
      },
    });

    console.log('Verifiable Credential Issued:', response.data);
  } catch (error) {
    console.error('Error issuing Verifiable Credential:');
  }
}

// Call the function
export default issueVerifiableCredential();