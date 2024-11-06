type ApiResponse = {
    data: ApiResponseData;
    result: string;
    message: string;
    token?: string;
    user?: User;
    status: number;
    links?: any;
    meta?: any;
};

type Policy = {
    id: number;
    title: string;
    slug: string;
    active: boolean;
    description: string | null;
    position: number | null;
};

type ApiResponseData =
    | PageSection
    | PageSection[]
    | Testimonial[]
    | Testimonial
    | Partner[]
    | Partner
    | Team
    | Team[]
    | Service
    | Policy[]
    | Policy
    | Service[]
    | Page
    | Conferences
    | Conferences[]
    | Page[]
    | NavigationMenu
    | NavigationMenu[]
    | Media
    | Media[]
    | PublicSetting
    | PublicSetting[]
    | City
    | City[]
    | Conference
    | Conference[]
    | Role
    | Role[]
    | User
    | User[]
    | Network
    | Network[]
    | Country
    | Country[]
    | Resource
    | Resource[]
    | Continent
    | Continent[]
    | Article
    | Article[];

type PublicSetting = {
    id: number;
    name: string;
    value: any;
};

type Team = {
    id: number;
    name: string;
    title: string;
    network: string;
    showHome: boolean;
    position: number;
    active: boolean;
    imageUrl: string;
    image: Media | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    deleted: boolean;
};

type ApplicationFormType = {
    name: string | null;
    email: string | null;
    image: Media | null;
    addressLineOne: string | null;
    addressLineTwo: string | null;
    city: string | null;
    state: string | null;
    postalCode: string | null;
    phone: string | null;
    fpp: string | null;
    website: string | null;
    profile: string | null;
    businessEst: string | null;
    membersCount: number | null;
    contactPersons: ContactPersons[];
    countryId: number | null;
    detectedCountryId: number | null;
};

type ContactPersons = {
    title: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    jobTitle: string | null;
    phoneNumber: string | null;
    cellNumber: string | null;
    image: Media | null;
    passport: Media | null;
};

type Article = {
    id: number;
    name: string;
    slug: string;
    position: number;
    featured: boolean;
    active: boolean;
    shortDes: string;
    des: string;
    publishDate: string;
    publishDateFormatted: string;
    imageUrl: string;
    image: Media | null;
    deleted: boolean;
    readingTime: string;
    deletedAt: string | null;
    createdAt: string | null;
};

type Service = {
    id: number;
    name: string;
    slug: string;
    icon: string | null;
    shortDescription: string | null;
    description: string | null;
    parentId: number | null;
    type: string | null;
    position: number | null;
    active: boolean;
    imageUrl: string | null;
    image: Media | null;
};
type Testimonial = {
    id: number;
    name: string;
    title: string;
    company: string;
    countryId: number;
    country: Country;
    position: number | null;
    des: string;
    shortDes: string;
    active: boolean;
    showHome: boolean;
    imageUrl: string;
    image: Media | null;
};

type Partner = {
    id: number;
    name: string;
    des: string;
    link: string;
    active: boolean;
    position: number;
    imageUrl: string;
    image: Media | null;
};

type Content = {
    id: number;
    name: string;
    type: string;
    detail: string;
    active: boolean;
    position: number | null;
    parentId: number | null;
    benefitId: number | null;
    eventId: number | null;
    items: any[];
    imageUrl: string;
    image: Media;
};

type Exhibition = {
    id: number;
    title: string;
    venue: string;
    slug: string;
    type: string;
    des: string | null;
    shortDes: string;
    urlText: string | undefined;
    urlPath: string | undefined;
    country: Country;
    startDateFormatted: string;
    endDateFormatted: string;
    startDate: string;
    endDate: string;
    startDateFront: string;
    endDateFront: string;
    delegates: string | null;
    sessions: string | null;
    companies: string | null;
    countries: string | null;
    featured: boolean;
    active: boolean;
    position: number;
    countryId: number;
    city: string | null;
    duration: number;
    eventOver: boolean;
    gallery: Media[];
    imageUrl: string;
    image: Media;
};

type PageSection = {
    id: number;
    postTitle: string;
    slug: string;
    title: string;
    subTitle?: string | null;
    description: string | undefined | null;
    type: string | undefined | null;
    active: boolean;
    buttonTextOne: string | null;
    buttonStyleOne: string | null;
    buttonRouteOne: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric | undefined;
    buttonIconOne: string | null;
    buttonLinkTypeOne: number;
    buttonTextTwo: string | null;
    buttonStyleTwo: string | null;
    buttonRouteTwo: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric | undefined;
    buttonIconTwo: string | null;
    buttonLinkTypeTwo: number;
    buttonOneActive: boolean;
    buttonTwoActive: boolean;
    children: PageSection[];
    imageUrl: string;
    image: Media | null;
    positionPivot?: number;
};
type Page = {
    id: number;
    name: string;
    slug: string | undefined | null;
    des: string | undefined | null;
    position: number;
    active: boolean;
    pageSections: PageSection[];
    deleted: boolean;
};

type Conference = {
    id: number;
    name: string;
    cityId: number;
    countryId: number;
    city: string;
    country: string;
    flag: string;
    venue: string;
    virtual: boolean;
    active: boolean;
    position: number;
    earlyBirdActive: boolean;
    earlyBirdEndDate: string;
    regDeadlineDate: string;
    hotelBookingMaxDuration: string[];
    ebMemberDelegatePrice: number;
    ebMemberSpousePrice: number;
    ebNonMemberDelegatePrice: number;
    ebNonMemberSpousePrice: number;
    memberDelegatePrice: number;
    memberSpousePrice: number;
    nonMemberDelegatePrice: number;
    nonMemberSpousePrice: number;
    duration: string[];
    isPast: boolean;
    logoUrl: string;
    logo: Media; // Adjust the type according to your actual data type
    logoDarkUrl: string;
    logoDark: Media; // Adjust the type according to your actual data type
    deleted: boolean;
    deletedAt: string | null;
};
type Media = {
    id: number;
    name: string;
    fileName: string;
    mimeType: string;
    size: number;
    createdAt: string;
    previewUrl: string;
    url: string;
    fullUrl: string;
};
type Continent = {
    id: number;
    name: string;
    active: boolean;
    position: number;
    countries: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    deleted: boolean;
};
type Network = {
    id: number;
    name: string;
    slug: string;
    domain: string;
    active: boolean;
    collection: boolean;
    position: string;
    imageUrl: string;
    image: Media;
    settings?: NetworkSetting[];
    fpp?: boolean;
    network?: boolean;
    status?: string;
    type?: string;
    startDate?: string;
    expireDate?: string;
    createdAt?: string;
    startDateFormatted?: string;
    expireDateFormatted?: string;
    createdAtFormatted?: string;
    createdSince?: string;
    expireDaysLeft?: string;
    expireSoon?: boolean;
    expired?: boolean;
};

type FAQ = {
    id: number;
    name: string;
    des: string;
    active: boolean;
    position: number;
};
type Resource = {
    id: number;
    active: boolean;
    name: string;
    slug: string;
    position: number;
    createdAt?: boolean;
    updatedAt?: string;
    deletedAt?: string | null;
    deleted?: boolean;
}; // For Certificates | Services | Referrals
type Credentials = {
    email: string | undefined | null;
    password: string | undefined | null;
};
type Role = {
    id: number;
    name: string;
    permissions: string[];
};
type UserGroup = {
    id: number;
    name: string;
    active: boolean;
    companies?: User[];
};

type UserParamsFilter = {
    name: string | null | undefined;
    city: string | null | undefined;
    countryId: number | null | undefined;
};

type UserServerParams = {
    filters: UserParamsFilter;
    networks: number[];
    orderBy?: string;
    orderByDirection?: 'asc' | 'desc';
    perPage: number;
    page: number;
};
type User = {
    id: number;
    name: string;
    voted?: boolean;
    email: string;
    wsaId?: string | null;
    group?: UserGroup;
    addressLineOne: string;
    addressLineTwo: string | null;
    mapLong?: string;
    mapLat?: string;
    slogan?: string | null;
    city: string;
    state: string | null;
    postalCode: string | null;
    companyEmail: string;
    phone: string;
    phoneKeyId: number;
    phoneKey: string;
    fax: string;
    faxKeyId: number;
    faxKey: string;
    website: string;
    profile: string | null;
    branches: string | null;
    businessEst: string;
    employeesNum: string;
    otherCertificates: string | null;
    otherServices: string | null;
    typeCompany: string;
    countryId: number;
    countryName: string;
    country: Country;
    imageUrl: string;
    image: Media | null;
    services?: number[] | Resource[];
    certificates?: number[] | Resource[];
    networks?: Network[];
    currentNetworkStatus?: Network;
    pendingNetworkStatus?: Network[];
    votingActive?: boolean;
};
type ToastItem = {
    title: string | null | undefined;
    message: string | null | undefined;
    type: string | null | undefined;
    duration: number | null | undefined;
};

type NavigationMenu = {
    id: number;
    name: string;
    position: number;
    active: boolean;
    menuItems: NavigationMenuItem[];
};
type NavigationMenuItem = {
    id: number;
    menuId: number;
    name: string;
    children: NavigationMenuItem[];
    link: string;
    icon: string | null;
    active: boolean;
    type: boolean;
    position: number;
    parentId: number;
};

type ipDetailsResponse = {
    as: string;
    city: string;
    country: string;
    countryCode: string;
    isp: string;
    lat: number;
    lon: number;
    org: string;
    query: string;
    region: string;
    regionName: string;
    status: string;
    timezone: string;
    zip: string;
};

type Country = {
    id: number;
    name: string;
    key: string;
    code: string;
    active: boolean;
    imageUrl: string;
    image: Media;
    position: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    deleted: boolean;
};
type City = {
    id: number;
    name: string;
    country: Country;
    position: number;
    countryName: string;
    countryId: number;
    lat: string;
    lng: string;
    active: number;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    deletedAt: string | null;
};

type SideBarMenu = {
    name: string;
    path: string;
    icon: string;
    subMenus: SideBarMenu[];
};

type NetworkSetting = {
    id: number;
    name: string;
    type: string;
    value: any | null;
};
type Brand = {
    logo: string;
    logoDark: string;
    name: string;
};
