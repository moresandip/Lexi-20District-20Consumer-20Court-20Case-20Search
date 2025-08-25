import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Scale, Search, ArrowLeft, MapPin, Building2, FileText, Calendar, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SearchConfig {
  title: string;
  description: string;
  placeholder: string;
  icon: React.ComponentType<any>;
}

interface CaseResult {
  case_number: string;
  case_stage: string;
  filing_date: string;
  complainant: string;
  complainant_advocate: string;
  respondent: string;
  respondent_advocate: string;
  document_link: string;
}

const searchConfigs: Record<string, SearchConfig> = {
  "case-number": {
    title: "Case Number Search",
    description: "Find cases by specific case number",
    placeholder: "Enter case number (e.g., 123/2025)",
    icon: FileText
  },
  "complainant": {
    title: "Complainant Search", 
    description: "Search cases by complainant name",
    placeholder: "Enter complainant name",
    icon: User
  },
  "respondent": {
    title: "Respondent Search",
    description: "Find cases by respondent details",
    placeholder: "Enter respondent name or company",
    icon: Building2
  },
  "advocate": {
    title: "Advocate Search",
    description: "Search by complainant or respondent advocate",
    placeholder: "Enter advocate name",
    icon: Scale
  },
  "industry": {
    title: "Industry Type Search",
    description: "Find cases by specific industry category",
    placeholder: "Enter industry type",
    icon: Building2
  },
  "judge": {
    title: "Judge Search",
    description: "Search cases by presiding judge",
    placeholder: "Enter judge name",
    icon: Users
  }
};

// Mock data for demonstration
const mockStates = [
  { id: "KA", name: "KARNATAKA" },
  { id: "MH", name: "MAHARASHTRA" },
  { id: "DL", name: "DELHI" },
  { id: "TN", name: "TAMIL NADU" },
  { id: "UP", name: "UTTAR PRADESH" }
];

const mockCommissions: Record<string, Array<{id: string, name: string}>> = {
  "KA": [
    { id: "KA001", name: "Bangalore 1st & Rural Additional" },
    { id: "KA002", name: "Bangalore 2nd Additional" },
    { id: "KA003", name: "Mysore District" }
  ],
  "MH": [
    { id: "MH001", name: "Mumbai District" },
    { id: "MH002", name: "Pune District" },
    { id: "MH003", name: "Nagpur District" }
  ],
  "DL": [
    { id: "DL001", name: "Delhi Central" },
    { id: "DL002", name: "Delhi North" },
    { id: "DL003", name: "Delhi South" }
  ]
};

const mockResults: CaseResult[] = [
  {
    case_number: "123/2025",
    case_stage: "Hearing",
    filing_date: "2025-02-01",
    complainant: "John Doe",
    complainant_advocate: "Adv. Reddy",
    respondent: "XYZ Ltd.",
    respondent_advocate: "Adv. Mehta",
    document_link: "https://e-jagriti.gov.in/case123"
  },
  {
    case_number: "124/2025",
    case_stage: "Evidence",
    filing_date: "2025-01-28",
    complainant: "Jane Smith",
    complainant_advocate: "Adv. Kumar",
    respondent: "ABC Corp",
    respondent_advocate: "Adv. Sharma", 
    document_link: "https://e-jagriti.gov.in/case124"
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
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Search Type Not Found</h1>
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
  const availableCommissions = selectedState ? mockCommissions[selectedState] || [] : [];

  const handleSearch = async () => {
    if (!selectedState || !selectedCommission || !searchValue.trim()) {
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults(mockResults);
      setLoading(false);
    }, 1000);
  };

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'hearing': return 'bg-blue-100 text-blue-800';
      case 'evidence': return 'bg-green-100 text-green-800';
      case 'judgment': return 'bg-purple-100 text-purple-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-slate-100 text-slate-800';
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
                  <h1 className="text-xl font-bold text-slate-900">{config.title}</h1>
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
                <Label htmlFor="commission" className="flex items-center space-x-2">
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
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            <Button 
              onClick={handleSearch} 
              disabled={!selectedState || !selectedCommission || !searchValue.trim() || loading}
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
                              <Badge className={getStageColor(result.case_stage)}>
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
                            <p className="font-medium text-slate-700 mb-1">Complainant</p>
                            <p className="text-slate-600">{result.complainant}</p>
                            <p className="text-slate-500 text-xs">Adv: {result.complainant_advocate}</p>
                          </div>
                          <div>
                            <p className="font-medium text-slate-700 mb-1">Respondent</p>
                            <p className="text-slate-600">{result.respondent}</p>
                            <p className="text-slate-500 text-xs">Adv: {result.respondent_advocate}</p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col justify-center space-y-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={result.document_link} target="_blank" rel="noopener noreferrer">
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
        {results.length === 0 && !loading && selectedState && selectedCommission && searchValue && (
          <Card>
            <CardContent className="pt-6 text-center">
              <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No cases found</h3>
              <p className="text-slate-600">
                No cases match your search criteria. Try adjusting your search terms.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
