import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Calculator, RotateCcw, Ruler, Weight } from "lucide-react";

interface BMIResult {
  value: number;
  category: string;
  description: string;
  color: string;
}

const BMICalculator = () => {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [isMetric, setIsMetric] = useState<boolean>(true);
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
      setBmiResult(null);
      return;
    }

    let bmi: number;
    
    if (isMetric) {
      // Height in cm, weight in kg
      const heightInMeters = heightNum / 100;
      bmi = weightNum / (heightInMeters * heightInMeters);
    } else {
      // Height in inches, weight in lbs
      bmi = (weightNum / (heightNum * heightNum)) * 703;
    }

    let category: string;
    let description: string;
    let color: string;

    if (bmi < 18.5) {
      category = "Underweight";
      description = "Consider consulting a healthcare provider";
      color = "text-health-warning";
    } else if (bmi < 25) {
      category = "Normal";
      description = "Healthy weight range";
      color = "text-health-success";
    } else if (bmi < 30) {
      category = "Overweight";
      description = "Consider lifestyle changes";
      color = "text-health-warning";
    } else {
      category = "Obese";
      description = "Consult with a healthcare provider";
      color = "text-health-danger";
    }

    setBmiResult({
      value: parseFloat(bmi.toFixed(1)),
      category,
      description,
      color,
    });
  };

  const resetCalculator = () => {
    setHeight("");
    setWeight("");
    setBmiResult(null);
  };

  useEffect(() => {
    if (height && weight) {
      calculateBMI();
    } else {
      setBmiResult(null);
    }
  }, [height, weight, isMetric]);

  return (
    <div className="min-h-screen bg-gradient-bg p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 animate-float">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            BMI Calculator
          </h1>
          <p className="text-muted-foreground text-lg">
            Calculate your Body Mass Index and understand your health status
          </p>
        </div>

        {/* Main Calculator Card */}
        <Card className="shadow-floating border-0 backdrop-blur-sm bg-card/80 mb-6">
          <CardHeader className="text-center pb-6">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Calculator className="h-6 w-6 text-primary" />
              Health Calculator
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Unit Toggle */}
            <div className="flex items-center justify-center gap-4 p-4 bg-accent rounded-lg">
              <Label htmlFor="unit-toggle" className={`font-medium transition-colors ${!isMetric ? 'text-foreground' : 'text-muted-foreground'}`}>
                Imperial (ft/lbs)
              </Label>
              <Switch
                id="unit-toggle"
                checked={isMetric}
                onCheckedChange={setIsMetric}
                className="data-[state=checked]:bg-gradient-primary"
              />
              <Label htmlFor="unit-toggle" className={`font-medium transition-colors ${isMetric ? 'text-foreground' : 'text-muted-foreground'}`}>
                Metric (cm/kg)
              </Label>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Height Input */}
              <div className="space-y-3">
                <Label htmlFor="height" className="flex items-center gap-2 text-base font-medium">
                  <Ruler className="h-4 w-4 text-primary" />
                  Height {isMetric ? "(cm)" : "(inches)"}
                </Label>
                <Input
                  id="height"
                  type="number"
                  placeholder={isMetric ? "170" : "68"}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="text-lg h-12 transition-all duration-300 focus:scale-105 focus:shadow-floating border-2 focus:border-primary"
                />
              </div>

              {/* Weight Input */}
              <div className="space-y-3">
                <Label htmlFor="weight" className="flex items-center gap-2 text-base font-medium">
                  <Weight className="h-4 w-4 text-primary" />
                  Weight {isMetric ? "(kg)" : "(lbs)"}
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder={isMetric ? "70" : "154"}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="text-lg h-12 transition-all duration-300 focus:scale-105 focus:shadow-floating border-2 focus:border-primary"
                />
              </div>
            </div>

            {/* Reset Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={resetCalculator}
                className="gap-2 hover:scale-105 transition-transform duration-200"
              >
                <RotateCcw className="h-4 w-4" />
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Card */}
        {bmiResult && (
          <Card className="shadow-floating border-0 backdrop-blur-sm bg-card/80 animate-float">
            <CardContent className="pt-8 text-center">
              <div className="space-y-6">
                {/* BMI Value */}
                <div className="space-y-2">
                  <p className="text-muted-foreground text-lg">Your BMI is</p>
                  <div className={`text-6xl font-bold ${bmiResult.color} animate-pulse-glow`}>
                    {bmiResult.value}
                  </div>
                </div>

                {/* Category Badge */}
                <div className="flex justify-center">
                  <Badge 
                    variant="outline" 
                    className={`text-lg px-6 py-2 ${bmiResult.color} border-current bg-current/10 font-semibold`}
                  >
                    {bmiResult.category}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-base max-w-md mx-auto">
                  {bmiResult.description}
                </p>

                {/* BMI Scale */}
                <div className="space-y-3 pt-4">
                  <p className="text-sm font-medium text-muted-foreground">BMI Categories</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="p-2 rounded bg-health-warning/10 text-health-warning">
                      <div className="font-medium">Underweight</div>
                      <div>&lt; 18.5</div>
                    </div>
                    <div className="p-2 rounded bg-health-success/10 text-health-success">
                      <div className="font-medium">Normal</div>
                      <div>18.5 - 24.9</div>
                    </div>
                    <div className="p-2 rounded bg-health-warning/10 text-health-warning">
                      <div className="font-medium">Overweight</div>
                      <div>25 - 29.9</div>
                    </div>
                    <div className="p-2 rounded bg-health-danger/10 text-health-danger">
                      <div className="font-medium">Obese</div>
                      <div>&gt; 30</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>BMI is a screening tool and not a diagnostic tool. Consult with healthcare professionals for medical advice.</p>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;