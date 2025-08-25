import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Scale,
  Search,
  ArrowLeft,
  MapPin,
  Building2,
  FileText,
  Calendar,
  User,
  Users,
  Download,
  Eye,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CaseResult, State, Commission } from "@shared/case-search";

interface SearchConfig {
  title: string;
  description: string;
  placeholder: string;
  icon: React.ComponentType<any>;
}

const searchConfigs: Record<string, SearchConfig> = {
  "case-number": {
    title: "Case Number Search",
    description: "Find cases by specific case number",
    placeholder: "Enter case number (e.g., 123/2025)",
    icon: FileText,
  },
  complainant: {
    title: "Complainant Search",
    description: "Search cases by complainant name",
    placeholder: "Enter complainant name",
    icon: User,
  },
  respondent: {
    title: "Respondent Search",
    description: "Find cases by respondent details",
    placeholder: "Enter respondent name or company",
    icon: Building2,
  },
  advocate: {
    title: "Advocate Search",
    description: "Search by complainant or respondent advocate",
    placeholder: "Enter advocate name",
    icon: Scale,
  },
  industry: {
    title: "Industry Type Search",
    description: "Find cases by specific industry category",
    placeholder: "Enter industry type",
    icon: Building2,
  },
  judge: {
    title: "Judge Search",
    description: "Search cases by presiding judge",
    placeholder: "Enter judge name",
    icon: Users,
  },
};

// Mock data for demonstration
const mockStates: State[] = [
  { id: "KA", name: "KARNATAKA" },
  { id: "MH", name: "MAHARASHTRA" },
  { id: "DL", name: "DELHI" },
  { id: "TN", name: "TAMIL NADU" },
  { id: "UP", name: "UTTAR PRADESH" },
];

const mockCommissions: Record<string, Commission[]> = {
  KA: [
    { id: "KA001", name: "Bangalore 1st & Rural Additional", state_id: "KA" },
    { id: "KA002", name: "Bangalore 2nd Additional", state_id: "KA" },
    { id: "KA003", name: "Mysore District", state_id: "KA" },
  ],
  MH: [
    { id: "MH001", name: "Mumbai District", state_id: "MH" },
    { id: "MH002", name: "Pune District", state_id: "MH" },
    { id: "MH003", name: "Nagpur District", state_id: "MH" },
  ],
  DL: [
    { id: "DL001", name: "Delhi Central", state_id: "DL" },
    { id: "DL002", name: "Delhi North", state_id: "DL" },
    { id: "DL003", name: "Delhi South", state_id: "DL" },
  ],
};

// Expanded mock database for different search scenarios
const mockCaseDatabase: CaseResult[] = [
  {
    case_number: "123/2024",
    case_stage: "Hearing",
    filing_date: "2024-03-15",
    complainant: "Rajesh Kumar",
    complainant_advocate: "Adv. Reddy",
    respondent: "Flipkart India Pvt Ltd",
    respondent_advocate: "Adv. Mehta",
    document_link: "#case-123-2024",
  },
  {
    case_number: "456/2024",
    case_stage: "Evidence",
    filing_date: "2024-05-20",
    complainant: "Priya Sharma",
    complainant_advocate: "Adv. Kumar",
    respondent: "Amazon Seller Services",
    respondent_advocate: "Adv. Singh",
    document_link: "#case-456-2024",
  },
  {
    case_number: "789/2024",
    case_stage: "Judgment",
    filing_date: "2024-01-10",
    complainant: "Suresh Reddy",
    complainant_advocate: "Adv. Reddy",
    respondent: "Samsung India Electronics",
    respondent_advocate: "Adv. Patel",
    document_link: "#case-789-2024",
  },
  {
    case_number: "101/2024",
    case_stage: "Closed",
    filing_date: "2023-12-05",
    complainant: "Meera Patel",
    complainant_advocate: "Adv. Kumar",
    respondent: "ICICI Bank Ltd",
    respondent_advocate: "Adv. Joshi",
    document_link: "#case-101-2024",
  },
  {
    case_number: "202/2024",
    case_stage: "Hearing",
    filing_date: "2024-04-12",
    complainant: "Anil Gupta",
    complainant_advocate: "Adv. Mehta",
    respondent: "Airtel Payments Bank",
    respondent_advocate: "Adv. Sharma",
    document_link: "#case-202-2024",
  },
  {
    case_number: "303/2024",
    case_stage: "Evidence",
    filing_date: "2024-06-08",
    complainant: "Kavita Singh",
    complainant_advocate: "Adv. Singh",
    respondent: "Zomato Ltd",
    respondent_advocate: "Adv. Agarwal",
    document_link: "#case-303-2024",
  }
];

export default function SearchPage() {
  const { searchType } = useParams<{ searchType: string }>();
  const [selectedState, setSelectedState] = useState("");
  const [selectedCommission, setSelectedCommission] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<CaseResult[]>([]);
  const [loading, setLoading] = useState(false);

  const config = searchType ? searchConfigs[searchType] : null;

  if (!config) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Search Type Not Found
            </h1>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const IconComponent = config.icon;
  const availableCommissions = selectedState
    ? mockCommissions[selectedState] || []
    : [];

  const handleSearch = async () => {
    if (!selectedState || !selectedCommission || !searchValue.trim()) {
      return;
    }

    setLoading(true);

    // Simulate API call with contextual search results
    setTimeout(() => {
      const searchTerm = searchValue.toLowerCase();
      let filteredResults: CaseResult[] = [];

      // Filter results based on search type and search term
      switch (searchType) {
        case 'case-number':
          filteredResults = mockCaseDatabase.filter(case_ =>
            case_.case_number.toLowerCase().includes(searchTerm)
          );
          break;
        case 'complainant':
          filteredResults = mockCaseDatabase.filter(case_ =>
            case_.complainant.toLowerCase().includes(searchTerm)
          );
          break;
        case 'respondent':
          filteredResults = mockCaseDatabase.filter(case_ =>
            case_.respondent.toLowerCase().includes(searchTerm)
          );
          break;
        case 'advocate':
          filteredResults = mockCaseDatabase.filter(case_ =>
            case_.complainant_advocate.toLowerCase().includes(searchTerm) ||
            case_.respondent_advocate.toLowerCase().includes(searchTerm)
          );
          break;
        case 'industry':
          // For industry, we'll match against respondent company names
          filteredResults = mockCaseDatabase.filter(case_ => {
            const respondent = case_.respondent.toLowerCase();
            return respondent.includes(searchTerm) ||
                   respondent.includes('bank') && searchTerm.includes('bank') ||
                   respondent.includes('electronics') && searchTerm.includes('electronics') ||
                   respondent.includes('ltd') && searchTerm.includes('company');
          });
          break;
        case 'judge':
          // For demo purposes, return cases that might be under that judge
          filteredResults = mockCaseDatabase.slice(0, 3);
          break;
        default:
          filteredResults = mockCaseDatabase;
      }

      // If no specific matches, show some relevant cases
      if (filteredResults.length === 0) {
        filteredResults = mockCaseDatabase.slice(0, 2);
      }

      setResults(filteredResults);
      setLoading(false);
    }, 1500);
  };

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "hearing":
        return "bg-blue-100 text-blue-800";
      case "evidence":
        return "bg-green-100 text-green-800";
      case "judgment":
        return "bg-purple-100 text-purple-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary rounded-lg">
                  <IconComponent className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    {config.title}
                  </h1>
                  <p className="text-sm text-slate-600">{config.description}</p>
                </div>
              </div>
            </div>
            <Link to="/">
              <div className="flex items-center space-x-2">
                <Scale className="h-6 w-6 text-primary" />
                <span className="font-semibold text-slate-900">Lexi</span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search Parameters</span>
            </CardTitle>
            <CardDescription>
              Select state, commission, and enter your search criteria
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* State Selection */}
              <div className="space-y-2">
                <Label htmlFor="state" className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>State</span>
                </Label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockStates.map((state) => (
                      <SelectItem key={state.id} value={state.id}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Commission Selection */}
              <div className="space-y-2">
                <Label
                  htmlFor="commission"
                  className="flex items-center space-x-2"
                >
                  <Building2 className="h-4 w-4" />
                  <span>Commission</span>
                </Label>
                <Select
                  value={selectedCommission}
                  onValueChange={setSelectedCommission}
                  disabled={!selectedState}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a commission" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCommissions.map((commission) => (
                      <SelectItem key={commission.id} value={commission.id}>
                        {commission.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search Value */}
            <div className="space-y-2">
              <Label htmlFor="searchValue">Search Term</Label>
              <Input
                id="searchValue"
                placeholder={config.placeholder}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>

            <Button
              onClick={handleSearch}
              disabled={
                !selectedState ||
                !selectedCommission ||
                !searchValue.trim() ||
                loading
              }
              className="w-full md:w-auto"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search Cases
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                Search Results ({results.length} cases found)
              </h2>
            </div>

            <div className="space-y-4">
              {results.map((result, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {/* Case Info */}
                      <div className="lg:col-span-2 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg text-slate-900 mb-1">
                              Case #{result.case_number}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <Badge
                                className={getStageColor(result.case_stage)}
                              >
                                {result.case_stage}
                              </Badge>
                              <span className="text-sm text-slate-500 flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                Filed: {result.filing_date}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-slate-700 mb-1">
                              Complainant
                            </p>
                            <p className="text-slate-600">
                              {result.complainant}
                            </p>
                            <p className="text-slate-500 text-xs">
                              Adv: {result.complainant_advocate}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-slate-700 mb-1">
                              Respondent
                            </p>
                            <p className="text-slate-600">
                              {result.respondent}
                            </p>
                            <p className="text-slate-500 text-xs">
                              Adv: {result.respondent_advocate}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col justify-center space-y-2">
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={result.document_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            View Documents
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {results.length === 0 &&
          !loading &&
          selectedState &&
          selectedCommission &&
          searchValue && (
            <Card>
              <CardContent className="pt-6 text-center">
                <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  No cases found
                </h3>
                <p className="text-slate-600">
                  No cases match your search criteria. Try adjusting your search
                  terms.
                </p>
              </CardContent>
            </Card>
          )}
      </main>
    </div>
  );
}
